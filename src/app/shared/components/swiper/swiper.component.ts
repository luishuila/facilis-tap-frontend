import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  standalone: false,
})
export class SwiperComponent implements OnChanges, AfterViewInit {
  @Input() slides: { image: string; title: string }[] = [];
  @Input() slidesPerView: number = 3;
  @Input() spaceBetween: number = 8;
  @Input() loop: boolean = true;
  @Input() navigation: boolean = true;

  swiperConfig: SwiperOptions = {};
  swiper!: Swiper;

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  ngOnChanges() {
    if (this.slides?.length > 0 && this.swiper) {
      this.swiper.update(); // ✅ Actualizar Swiper en lugar de inicializarlo de nuevo
    }
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
        init: () => console.log('Swiper initialized'),
        slideChange: () => console.log('Slide changed'),
      }
    };

    this.swiper = new Swiper(this.swiperContainer.nativeElement, this.swiperConfig);
  }
}
