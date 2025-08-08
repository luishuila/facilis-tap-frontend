import {
  Component, Input, ViewChild, ElementRef,
  AfterViewInit, OnChanges, OnDestroy, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'fac-subcategory',
  templateUrl: './fac-subcategory.component.html',
  styleUrls: ['./fac-subcategory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FacSubCategoryComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() items: any[] = [];

  // UX nativo
  @Input() slidesPerView = 1.15;
  @Input() centeredSlides = true;
  @Input() spaceBetween = 12;
  @Input() loop = false;
  @Input() navigation = true;
  @Input() pagination = true;

  // mapeo de campos
  @Input() valueField = 'id';
  @Input() labelField = 'name';
  @Input() img = 'img';

  // responsive
  @Input() breakpoints: SwiperOptions['breakpoints'] = {
    480:  { slidesPerView: 1.15, spaceBetween: 12 },
    640:  { slidesPerView: 2,    spaceBetween: 12 },
    920:  { slidesPerView: 3,    spaceBetween: 12 },
    1200: { slidesPerView: 4,    spaceBetween: 12 },
  };

  // estilo
  @Input() aspectRatio = '16/9';
  @Input() showLabelChip = true;
  @Input() ripple = true;

  // eventos
  @Output() subCategoryEvent = new EventEmitter<any>(); // item completo
  @Output() subCategoryId = new EventEmitter<any>();    // solo id

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn', { static: false }) prevBtn!: ElementRef<HTMLElement>;
  @ViewChild('paginationEl', { static: false }) paginationEl!: ElementRef<HTMLElement>;

  swiper?: Swiper;

  ngAfterViewInit() { this.initSwiper(); }

  ngOnChanges(ch: SimpleChanges) {
    // si cambian items/config, refresca
    if ((ch['items'] && !ch['items'].firstChange) || this.swiper) {
      queueMicrotask(() => this.reinitSwiper());
    }
  }

  ngOnDestroy() { this.destroySwiper(); }

  onImgClick(item: any) {
    const id = item?.[this.valueField] ?? item;
    this.subCategoryEvent.emit(item);
    this.subCategoryId.emit(id);
  }

  trackById = (_: number, it: any) => it?.[this.valueField] ?? it;

  private initSwiper() {
    if (!this.swiperContainer?.nativeElement) return;

    const nav = this.navigation
      ? { nextEl: this.nextBtn?.nativeElement, prevEl: this.prevBtn?.nativeElement }
      : undefined;

    const pag = this.pagination
      ? { el: this.paginationEl?.nativeElement, clickable: true }
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
    };

    this.destroySwiper();
    this.swiper = new Swiper(this.swiperContainer.nativeElement, config);
  }

  private reinitSwiper() {
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
