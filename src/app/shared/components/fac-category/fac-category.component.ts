import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'fac-category',
  templateUrl: './fac-category.component.html',
  styleUrls: ['./fac-category.component.scss'],
  standalone: false,
})
export class  FacCategoryComponent implements OnChanges, AfterViewInit {
  @Input() items: { img: string; title: string, id:number, description:string }[] | any[] = [];
  @Input() slidesPerView: number = 3;
  @Input() spaceBetween: number = 8;
  @Input() loop: boolean = true;
  @Input() navigation: boolean = true;
  @Input() valueField: string = 'id';  
  @Input() labelField: string = 'name';  
  @Input() img: string = 'img'; 
  @Output() categoryEvent = new EventEmitter<any>();
  swiperConfig: SwiperOptions = {};
  swiper!: Swiper;

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  ngOnChanges() {
    if (this.items?.length > 0 && this.swiper) {
      this.swiper.update(); 
    }
  }
  onImgClick(id: any) {
    this.categoryEvent.emit(id)
  }
  ngAfterViewInit() {
    setTimeout(() => this.initSwiper(), 0);
  }

  private initSwiper() {
    if (!this.swiperContainer || !this.swiperContainer.nativeElement) {
      console.error("Error: swiperContainer no está inicializado");
      return;
    }

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiperConfig = {
      modules: [Navigation, Pagination],
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      loop: this.loop,
      navigation: this.navigation ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false,
      pagination: { clickable: true },
      scrollbar: { draggable: true },
      observer: true,
      observeParents: true,
      on: {
        init: () => console.log(),
        slideChange: () => console.log(),
      }
    };

    this.swiper = new Swiper(this.swiperContainer.nativeElement, this.swiperConfig);
  }
}
