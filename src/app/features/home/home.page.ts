// src/app/features/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDto, SubcategoryDto } from 'src/app/core/models/category/category.dto';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { HomeService } from 'src/app/core/services/home/home.service';
import { ServicesTypeService } from 'src/app/core/services/servicesType/services-type.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  showHeader: boolean = true;
  lastScrollPosition: number = 0;
  headerOpacity: number = 1;
  headerOffset: number = 0;
  categoryAll:CategoryDto[] =[];
  subCategory:SubcategoryDto[] = [];
  subCategoryId:  number|null|undefined ;
  exampleData = exampleData;
  items: any[] = [];
  page = 1;
  limit = 10;
  lat = 4.6097;
  lon = -74.0817;
  categoryId?: number;
  subcategoryId?: number;
  hasMore = true;
  constructor(private router: Router, private categoryService:CategoryService, 
    private homeService:HomeService) {
    
    this.categoryService.findAllCategory().subscribe(data=>{
      this.categoryAll = data
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
         this.lat = position.coords.latitude;
         this.lon = position.coords.longitude;
        console.log("Latitud:", this.lat);
        console.log("Longitud:", this.lon);
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
  ionViewDidEnter() {
    this.resetData();
    this.loadHome();
  }
  resetData() {
    this.items = [];
    this.page = 1;
    this.hasMore = true;
  }
  loadMore(event: any) {
    console.log('More ckre')
    this.loadHome(event);
  }
  ngOnInit() {}

  reloadPage() {
    window.location.reload(); 
  }

  loadHome(event?: any) {
    if (!this.hasMore) {
      if (event) event.target.complete();
      return;
    }
  
    this.homeService.getHome(this.lat, this.lon, this.page, this.limit, this.categoryId, this.subcategoryId)
      .subscribe((data: any) => {
        if (!Array.isArray(data?.items)) {
          console.warn('No hay items válidos');
          this.hasMore = false;
          if (event) event.target.complete();
          return;
        }
        if (this.page === 1) {
          this.items = Array.isArray(data?.items) ? data.items : [];
        } else {
          console.log('.items-->',  data)
          const newItems = Array.isArray(data?.items) ? data.items : [];
          this.items = [...this.items, ...newItems];
        }
        console.log('.items-->',  this.items)
        // ✅ Verifica si hay más datos
        if (data.length < this.limit) {
          this.hasMore = false;
        } else {
          this.page++;
        }
  
        if (event) event.target.complete();
      }, error => {
        console.error('Error cargando datos:', error);
        if (event) event.target.complete();
      });
  }
  ionViewWillEnter() {
    this.resetPage();
  }
  onCategory(event:any){
    this.categoryId = event;
    this.subCategory = []
    this.categoryService.findAllSubCategory(event).subscribe(data=>{
      this.subCategory = data
    })
  }
  onSubCategory(id:any){
    console.log('onSubCategory-->', id)
  }
  onScroll(event: any) {
    const currentScrollPosition = event.detail.scrollTop;
    const scrollDifference = currentScrollPosition - this.lastScrollPosition;

    if (scrollDifference > 0) {
      this.headerOpacity = Math.max(0, this.headerOpacity - scrollDifference * 0.005);
      this.headerOffset = Math.min(50, this.headerOffset + scrollDifference * 0.1);
    } else {
      this.headerOpacity = Math.min(1, this.headerOpacity - scrollDifference * 0.01);
      this.headerOffset = Math.max(0, this.headerOffset + scrollDifference * 0.2);
    }

    this.lastScrollPosition = currentScrollPosition;
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  resetPage() {
    this.headerOpacity = 1;
    this.headerOffset = 0;
    this.lastScrollPosition = 0;

    this.exampleData = exampleData
    document.querySelector('ion-content')?.scrollToTop(0);
  }
}



export const exampleData = [
  {
    imageUrl: 'https://picsum.photos/600/300?random=1',
    title: 'Parque Nacional Natural Tayrona',
    description: 'Un parque natural famoso por sus playas, fauna y flora en la región Caribe.',
    location: 'Santa Marta, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=2',
    title: 'Ciudad Perdida',
    description: 'Un antiguo asentamiento indígena rodeado de naturaleza y cultura ancestral.',
    location: 'Sierra Nevada de Santa Marta, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=3',
    title: 'Cañón del Chicamocha',
    description: 'Un destino turístico ideal para deportes extremos y disfrutar del paisaje.',
    location: 'Santander, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=4',
    title: 'Isla de San Andrés',
    description: 'Una isla paradisíaca famosa por su mar de siete colores y actividades acuáticas.',
    location: 'San Andrés, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=5',
    title: 'Cartagena de Indias',
    description: 'Una ciudad colonial conocida por sus murallas, arquitectura y cultura vibrante.',
    location: 'Cartagena, Colombia',
    showInfoIcon: true,
    showLocationIcon: false
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=6',
    title: 'Catedral de Sal de Zipaquirá',
    description: 'Una catedral subterránea construida dentro de una mina de sal, símbolo religioso y cultural.',
    location: 'Zipaquirá, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=7',
    title: 'Caño Cristales',
    description: 'Conocido como el río de los cinco colores, famoso por sus tonos vibrantes.',
    location: 'Meta, Colombia',
    showInfoIcon: false,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=8',
    title: 'Valle de Cocora',
    description: 'Un valle montañoso famoso por sus altas palmas de cera y paisajes verdes.',
    location: 'Quindío, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=9',
    title: 'Desierto de la Tatacoa',
    description: 'Un desierto semitropical perfecto para observar las estrellas y explorar la naturaleza.',
    location: 'Huila, Colombia',
    showInfoIcon: true,
    showLocationIcon: false
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=10',
    title: 'Cerro de Monserrate',
    description: 'Un cerro icónico con una iglesia en la cima y vistas panorámicas de Bogotá.',
    location: 'Bogotá, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=11',
    title: 'Playa Blanca',
    description: 'Una playa de arena blanca y aguas cristalinas ideal para relajarse.',
    location: 'Isla Barú, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=12',
    title: 'Santuario de Las Lajas',
    description: 'Una iglesia neogótica construida en un cañón, conocida por su arquitectura única.',
    location: 'Nariño, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=13',
    title: 'Parque del Café',
    description: 'Un parque temático que combina diversión y cultura cafetera.',
    location: 'Quindío, Colombia',
    showInfoIcon: true,
    showLocationIcon: false
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=14',
    title: 'Islas del Rosario',
    description: 'Un archipiélago famoso por su biodiversidad marina y aguas cristalinas.',
    location: 'Cartagena, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=15',
    title: 'Nevado del Ruiz',
    description: 'Un volcán activo rodeado de paisajes montañosos y naturaleza.',
    location: 'Tolima, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=16',
    title: 'Guatapé y La Piedra del Peñol',
    description: 'Un colorido pueblo y una roca gigante con vistas espectaculares.',
    location: 'Antioquia, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=17',
    title: 'Amazonas',
    description: 'Una región selvática rica en biodiversidad y cultura indígena.',
    location: 'Amazonas, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=18',
    title: 'Cascada de Juan Curí',
    description: 'Una cascada impresionante rodeada de naturaleza y senderos.',
    location: 'Santander, Colombia',
    showInfoIcon: true,
    showLocationIcon: false
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=19',
    title: 'Bahía Solano',
    description: 'Un paraíso natural ideal para el avistamiento de ballenas y disfrutar del océano.',
    location: 'Chocó, Colombia',
    showInfoIcon: false,
    showLocationIcon: true
  },
  {
    imageUrl: 'https://picsum.photos/600/300?random=20',
    title: 'Parque Nacional Natural Los Nevados',
    description: 'Un parque con paisajes nevados, fauna diversa y actividades al aire libre.',
    location: 'Eje Cafetero, Colombia',
    showInfoIcon: true,
    showLocationIcon: true
  }
];

/*
  ngOnInit() {
    this.generateRandomSlides();
  }

  generateRandomSlides() {
    
  // slides: Array<{ id: number; title: string; image: string }> = [];
    // this.slides = Array.from({ length: 5 }, (_, i) => ({
    //   id: i + 1,
    //   title: `Slide ${i + 1} - ${this.getRandomTitle()}`,
    //   image: `https://picsum.photos/seed/${Math.random()}/600/300`,
    // }));
  }

  getRandomTitle(): string {
    return '';
    // const titles = [
    //   'Descubre el mundo',
    //   'Aventura sin límites',
    //   'Explora lo desconocido',
    //   'Siente la libertad',
    //   'Viaja con estilo',
    // ];
    // return titles[Math.floor(Math.random() * titles.length)];
  }
    */