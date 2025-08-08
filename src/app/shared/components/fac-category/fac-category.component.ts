import {
  Component, Input, ViewChild, ElementRef,
  AfterViewInit, OnChanges, OnDestroy, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

@Component({
  selector: 'fac-category',
  templateUrl: './fac-category.component.html',
  styleUrls: ['./fac-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FacCategoryComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() items: any[] = [];
  @Input() slidesPerView = 1.15;           // “peek” nativo en mobile
  @Input() spaceBetween = 12;
  @Input() loop = false;
  @Input() navigation = true;
  @Input() pagination = true;
  @Input() centeredSlides = true;

  // mapeo de campos
  @Input() valueField = 'id';
  @Input() labelField = 'name';
  @Input() imgField = 'img';            
  @Input() ariaLabelField?: string;

  // responsivo (puedes sobrescribirlo)
  @Input() breakpoints: SwiperOptions['breakpoints'] = {
    480:  { slidesPerView: 1.15, spaceBetween: 12 },
    640:  { slidesPerView: 2,    spaceBetween: 12 },
    920:  { slidesPerView: 3,    spaceBetween: 12 },
    1200: { slidesPerView: 4,    spaceBetween: 12 },
  };

  // estilos/UX
  @Input() aspectRatio = '16/9';
  @Input() showLabelChip = true;
  @Input() ripple = true;

  @Output() categoryEvent = new EventEmitter<any>();   // emite el item
  @Output() categoryId = new EventEmitter<any>();      // emite solo el id

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn', { static: false }) prevBtn!: ElementRef<HTMLElement>;
  @ViewChild('paginationEl', { static: false }) paginationEl!: ElementRef<HTMLElement>;

  swiper?: Swiper;

  ngAfterViewInit() { this.initSwiper(); }

  ngOnChanges(ch: SimpleChanges) {
    // si cambian items o config en caliente, re-init para no dejar Swiper “cojo”
    if ((ch['items'] && !ch['items'].firstChange) || this.swiper) {
      queueMicrotask(() => this.reinitSwiper());
    }
  }

  ngOnDestroy() {
    this.destroySwiper();
  }

  onImgClick(item: any) {
    const id = item?.[this.valueField] ?? item;
    this.categoryEvent.emit(item);
    this.categoryId.emit(id);
  }

  trackById = (_: number, it: any) => it?.[this.valueField] ?? it;

  // --- Swiper ---
  private initSwiper() {
    if (!this.swiperContainer?.nativeElement) return;

    const nav = this.navigation
      ? {
          nextEl: this.nextBtn?.nativeElement ?? undefined,
          prevEl: this.prevBtn?.nativeElement ?? undefined,
        }
      : undefined;

    const pag = this.pagination
      ? {
          el: this.paginationEl?.nativeElement ?? undefined,
          clickable: true,
        }
      : undefined;

    const config: SwiperOptions = {
      modules: [Navigation, Pagination, A11y, Keyboard],
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      centeredSlides: this.centeredSlides,
      breakpoints: this.breakpoints,
      loop: this.loop,
      navigation: nav,
      pagination: pag,
      keyboard: { enabled: true },
      a11y: { enabled: true },
      observer: true,
      observeParents: true,
      on: {
        init: () => {/* noop */},
      },
    };

    this.destroySwiper();
    this.swiper = new Swiper(this.swiperContainer.nativeElement, config);
  }

  private reinitSwiper() {
    // actualizar si ya existe, si no, crear
    if (this.swiper) {
      this.swiper.update();
    } else {
      this.initSwiper();
    }
  }

  private destroySwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }
  }
}
