// src/app/features/home/home.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDto, SubcategoryDto } from 'src/app/core/models/category/category.dto';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ShareDataService } from 'src/app/core/services/DataShareService/shareDataService';
import { HomeService } from 'src/app/core/services/home/home.service';
import { ViewWillLeave, ViewWillEnter } from '@ionic/angular';
import { LocationService } from 'src/app/core/services/genericService/location.service';
import { firstValueFrom } from 'rxjs';
import { filter, take, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements ViewWillLeave, ViewWillEnter {
  @ViewChild('miCard', { static: false, read: ElementRef }) cardRef!: ElementRef;

  showHeader = true;
  lastScrollPosition = 0;
  headerOpacity = 1;
  headerOffset = 0;

  categoryAll: CategoryDto[] = [];
  subCategory: SubcategoryDto[] = [];
  items: any[] = [];

  page = 1;
  limit = 50;
  lat = 8.1003879;
  lon = -76.7220969;
  categoryId?: number;
  subcategoryId?: number;
  hasMore = true;

  // 🔒 Guardas
  private isLoading = false;
  private didLoadOnEnter = false; // ⬅️ evita doble llamada por entrada

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private homeService: HomeService,
    private sharedData: ShareDataService,
    private locationService: LocationService
  ) {}

  // ========== Ciclo de vida ==========
  async ionViewWillEnter() {
    // ⬅️ si por alguna razón el hook se dispara dos veces, esto lo detiene
    if (this.didLoadOnEnter) return;
    this.didLoadOnEnter = true;
    this.resetPage();
    this.hasMore = true;
    this.subCategory = [];

    // Categorías al entrar
    this.categoryService.findAllCategory().subscribe(data => (this.categoryAll = data));

    // Arranca ubicación (si tu servicio lo requiere)
    await this.locationService.start();

    // ✅ SOLO UNA VEZ: obten la primera coordenada disponible (con timeout de seguridad)
    try {
      const c = await firstValueFrom(
        this.locationService.coords$.pipe(
          filter((v: any) => !!v),
          take(1),
          timeout(8000)
        )
      );
      this.lat = c.lat;
      this.lon = c.lon;
    } catch {
      // Si falla la ubicación, sigue con lat/lon por defecto
    }

    // ✅ Única carga de datos al entrar
    this.resetData();
    this.loadHome();
  }

  ionViewWillLeave() {
    this.subcategoryId = undefined;
    this.categoryId = undefined;
    this.resetData();

    this.locationService.stop();

    // Permite que en la próxima entrada vuelva a cargar una sola vez
    this.didLoadOnEnter = false; // ⬅️ reset del flag
  }

  // ========== UI helpers ==========
  enfocarCard() {
    const element = this.cardRef.nativeElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('resaltado');
    setTimeout(() => element.classList.remove('resaltado'), 1500);
  }

  onScroll(event: any) {
    const currentScrollPosition = event.detail.scrollTop;
    const diff = currentScrollPosition - this.lastScrollPosition;

    if (diff > 0) {
      this.headerOpacity = Math.max(0, this.headerOpacity - diff * 0.005);
      this.headerOffset = Math.min(50, this.headerOffset + diff * 0.1);
    } else {
      this.headerOpacity = Math.min(1, this.headerOpacity - diff * 0.01);
      this.headerOffset = Math.max(0, this.headerOffset + diff * 0.2);
    }
    this.lastScrollPosition = currentScrollPosition;
  }

  handleRefresh(event: CustomEvent) {
    this.resetData();
    this.loadHome(event);
  }

  resetPage() {
    this.headerOpacity = 1;
    this.headerOffset = 0;
    this.lastScrollPosition = 0;
    document.querySelector('ion-content')?.scrollToTop(0);
  }

  // ========== Filtros ==========
  onCategory(event: any) {
    this.categoryId = event.id;
    this.subCategory = [];
    this.subcategoryId = undefined;

    this.resetData();
    this.loadHome();

    this.categoryService.findAllSubCategory(event.id).subscribe(data => (this.subCategory = data));
  }

  onSubCategory(event: any) {
    this.subcategoryId = event.id;
    this.resetData();
    this.loadHome();
  }

  // ========== Paginación / Data ==========
  resetData() {
    this.items = [];
    this.page = 1;
    this.hasMore = true;
  }

  loadMore(event: any) {
    this.loadHome(event);
  }

  // 👇 Nada de window.location.reload()
  reloadPage() {
    this.resetData();
    this.loadHome();
  }

  loadHome(event?: any) {
    if (!this.hasMore || this.isLoading) {
      if (event) event.target.complete();
      return;
    }

    this.isLoading = true;

    this.homeService.getHome(this.lat, this.lon, this.page, this.limit, this.categoryId, this.subcategoryId)
      .subscribe({
        next: (data: any) => {
          const newItems = Array.isArray(data?.items) ? data.items : [];
          this.items = this.page === 1 ? newItems : [...this.items, ...newItems];

          if (newItems.length < this.limit) {
            this.hasMore = false;
          } else {
            this.page++;
          }
        },
        error: (err) => {
          console.error('Error cargando datos:', err);
        },
        complete: () => {
          this.isLoading = false;
          if (event) event.target.complete();
        }
      });
  }

  // ========== Navegación ==========
  navegate(event: any, items: any) {
    this.sharedData.data = {
      idProveder: items.idprov,
      categoryId: this.categoryId,
      subcategoryId: this.subcategoryId,
      item: items
    };
    this.router.navigate(['navigation/profile-services']);
  }
}
