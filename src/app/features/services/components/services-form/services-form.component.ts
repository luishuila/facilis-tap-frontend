import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { usersData } from 'src/app/core/generate/idData';

import { CategoryDto, SubcategoryDto } from 'src/app/core/models/category/category.dto';
import { ProviderDto } from 'src/app/core/models/provider/ProviderI';
import { ServiceCreateDto } from 'src/app/core/models/services/ServiceCreateDto';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { ServicesService } from 'src/app/core/services/servicesType/services.service';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
  standalone: false,
})
export class ServicesFormComponent implements OnInit {
  servicesForm!: FormGroup;

  // Estado
  isEditMode = false;
  serviceId: number | null = null;
  providerId: number | null = null;
  loading = false;
  submitting = false;

  // Catálogos
  providerInfo: ProviderDto | null = null;
  categoryAll: CategoryDto[] = [];
  providersAll: ProviderDto[] = [];
  /** Subcategorías por índice del item */
  subcategoriesByIndex: SubcategoryDto[][] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.buildForm();

    // Rutas: /services/:providerId (crear array) | /services/:providerId/edit/:serviceId (editar 1)
    this.providerId = this.toNumber(this.route.snapshot.paramMap.get('providerId'));
    this.serviceId = this.toNumber(this.route.snapshot.paramMap.get('serviceId'));
    this.isEditMode = !!this.serviceId;


    if (!this.providerId && !this.serviceId) {
      this.providerService.findOneAll().subscribe(providers => {
        this.providersAll = providers ?? [];
        if (this.servicesFA.length === 0) this.addService();
      });
    } else {
      this.onInit();
    }


  }

  onInit() {

    if (this.providerId) {
      this.servicesForm.patchValue({ providerId: this.providerId });
    }

    this.loading = true;
    let providerData = this.providerId
      ? this.providerService.findOneProvedor(this.providerId ?? 0)
      : of<ProviderDto | null>(null);

    const categories = providerData.pipe(map((p) => p?.categories ?? [] as CategoryDto[]));

    forkJoin({
      provider: this.providerId ? providerData : of(null),
      categories: categories,
    })
      .pipe(
        tap(({ provider, categories }) => {
          this.providerInfo = provider;
          this.categoryAll = categories ?? [];
        }),
        switchMap(() => {
          if (this.servicesFA.length === 0) this.addService();
          if (!this.isEditMode || !this.serviceId) return of(null);

          // Edición: cargo el servicio en el primer item
          return this.servicesService.findOne(this.serviceId).pipe(
            tap(service => this.patchServiceGroupFromModel(0, service))
          );
        })
      )
      .subscribe({
        next: () => (this.loading = false),
        error: (err) => { console.error(err); this.loading = false; }
      });
  }
  // ===== Form root =====
  private buildForm(): void {
    this.servicesForm = this.fb.group({
      providerId: [null, Validators.required], // raíz, aplica a todos
      services: this.fb.array([]),
    });
  }

  // ===== Helpers =====
  private toNumber(value: string | null): number | null {
    if (value == null) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  get servicesFA(): FormArray {
    return this.servicesForm.get('services') as FormArray;
  }
  get services(): FormArray {
    return this.servicesFA;
  }

  // ===== Mapeo para edición (carga un servicio en el item 0) =====
  private patchServiceGroupFromModel(i: number, model: any): void {
    const svcFG = this.servicesFA.at(i) as FormGroup;

    const categoryId = model?.subcategory?.category?.id ?? model?.categoryId ?? null;
    const subcategoryId = model?.subcategory?.id ?? model?.subcategoryId ?? null;
    const subcategoryName = model?.subcategory?.name ?? model?.subcategoryName ?? null;

    const setFirstItem = () => {
      const itemsFA = this.itemsFAAt(i);
      itemsFA.clear();
      itemsFA.push(this.createItemGroup({
        name: model?.name ?? '',
        description: model?.description ?? '',
        serviceTime: model?.serviceTime ?? '',
        price: Number(model?.price ?? 0),
      }));
    };

    if (categoryId) {
      this.categoryService.findAllSubCategory(Number(categoryId)).subscribe((subs) => {
        this.subcategoriesByIndex[i] = subs ?? [];
        svcFG.patchValue({
          categoryId: Number(categoryId),
          subcategoryId: subcategoryId ?? null,
          subcategoryName: subcategoryName ?? null,
          img: model?.img ?? '',
        }, { emitEvent: false });
        setFirstItem();
      });
    } else {
      this.subcategoriesByIndex[i] = [];
      svcFG.patchValue({
        categoryId: null,
        subcategoryId: subcategoryId ?? null,
        subcategoryName: subcategoryName ?? null,
        img: model?.img ?? '',
      }, { emitEvent: false });
      setFirstItem();
    }
  }

  // ====== Servicio (grupo) + Ítems ======
  private createServiceGroup(data?: Partial<ServiceCreateDto>): FormGroup {
    return this.fb.group({
      providerId: [this.providerId ?? null, Validators.required],
      categoryId: [null, Validators.required],
      subcategoryId: [data?.subcategory ?? null, Validators.required],
      img: [data?.img ?? ''],
      subcategoryName: [null],
      items: this.fb.array<FormGroup>([
        this.createItemGroup(data)
      ]),
    });
  }

  private createItemGroup(data?: Partial<ServiceCreateDto>): FormGroup {
    return this.fb.group({
      name: [data?.name ?? '', [Validators.required, Validators.maxLength(120)]],
      description: [data?.description ?? '', Validators.required],
      serviceTime: [data?.serviceTime ?? '', [Validators.required, Validators.min(1)]],
      price: [data?.price ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  addService(prefill?: Partial<ServiceCreateDto>): void {
    const fg = this.createServiceGroup(prefill);
    this.servicesFA.push(fg);
    this.subcategoriesByIndex.push([]);
  }

  removeService(i: number): void {
    this.servicesFA.removeAt(i);
    this.subcategoriesByIndex.splice(i, 1);
  }

  itemsFAAt(i: number): FormArray {
    return (this.servicesFA.at(i) as FormGroup).get('items') as FormArray;
  }

  addItem(i: number, prefill?: Partial<ServiceCreateDto>): void {
    this.itemsFAAt(i).insert(0, this.createItemGroup(prefill));
  }

  removeItem(i: number, k: number): void {
    const arr = this.itemsFAAt(i);
    if (arr.length > 1) arr.removeAt(k);
  }

  // ===== Estados UI =====
  // Reemplazar método actual
  isItemReady(i: number, k: number): boolean {
    const fg = this.itemsFAAt(i).at(k) as FormGroup;

    const nameRaw = (fg.get('name')?.value ?? '').toString().trim();
    const timeRaw = fg.get('serviceTime')?.value;

    const hasName = nameRaw.length > 0;
    const timeNum = Number(timeRaw);
    const hasTime = Number.isFinite(timeNum) && timeNum > 0;

    return hasName && hasTime;
  }

  canAddNewItem(i: number): boolean {
    const arr = this.itemsFAAt(i);
    if (!arr.length) return true;
    const lastIdx = arr.length - 1;
    return this.isItemReady(i, lastIdx);
  }
  itemHeaderText(i: number, k: number): string {
    return this.isItemReady(i, k) ? `Ítem ${k + 1}` : 'Nuevo ítem';
  }
  itemHeaderClass(i: number, k: number): string {
    return this.isItemReady(i, k) ? 'header-valid' : 'header-invalid';
  }
  timeLabelClass(i: number, k: number): string {
    const fg = this.itemsFAAt(i).at(k) as FormGroup;
    return fg.get('serviceTime')?.valid ? 'lbl-valid' : 'lbl-invalid';
  }
  timeLabelClass2(i: number, k: number): string {
    const fg = this.itemsFAAt(i).at(k) as FormGroup;
    return fg.get('name')?.valid ? 'lbl-valid' : 'lbl-invalid';
  }
  // ⬇️ NUEVO: clase para el label “Nombre” (rojo si inválido/tocado o en envío)
  nameLabelClass(i: number, k: number): string {
    const ctrl = (this.itemsFAAt(i).at(k) as FormGroup).get('name');
    if (!ctrl) return '';
    // cuando ya fue tocado o estamos enviando, muestra estado
    if (ctrl.touched || this.submitting) {
      return ctrl.invalid ? 'lbl-invalid' : 'lbl-valid';
    }
    return '';
  }

  // ===== Unicidad de subcategorías =====
  private getSelectedSubcategoryIds(excludeIndex?: number): number[] {
    const ids: number[] = [];
    this.servicesFA.controls.forEach((ctrl, idx) => {
      if (excludeIndex != null && idx === excludeIndex) return;
      const id = (ctrl as FormGroup).get('subcategoryId')?.value;
      if (id != null) ids.push(Number(id));
    });
    return ids;
  }

  getAvailableSubcategories(i: number): SubcategoryDto[] {
    const taken = new Set(this.getSelectedSubcategoryIds(i));
    return (this.subcategoriesByIndex[i] ?? []).filter(sc => !taken.has(Number(sc.id)));
  }

  private isSubcategoryTaken(id: number, excludeIndex: number): boolean {
    return this.getSelectedSubcategoryIds(excludeIndex).includes(Number(id));
  }
  // NUEVO: cuando cambie el proveedor en el acordeón i
  onProviderChange(i: number, ev: any): void {
    const providerId = Number(ev?.detail?.value ?? ev?.target?.value);
    const svcFG = this.servicesFA.at(i) as FormGroup;

    // Guardar proveedor en el grupo e igualmente en la raíz
    svcFG.patchValue(
      { providerId, categoryId: null, subcategoryId: null, subcategoryName: null },
      { emitEvent: false }
    );
    this.servicesForm.patchValue({ providerId }, { emitEvent: false });

    // Limpiar ítems
    this.itemsFAAt(i).clear();
    this.itemsFAAt(i).push(this.createItemGroup());

    // Si no hay proveedor seleccionado, limpiamos cat/subcat y terminamos
    if (!providerId) {
      this.categoryAll = [];
      this.subcategoriesByIndex[i] = [];
      return;
    }

    // Cargar categorías del proveedor seleccionado
    this.providerService.findOneProvedor(providerId).subscribe((provider) => {
      this.providerInfo = provider;
      this.categoryAll = provider?.categories ?? [];
      this.subcategoriesByIndex[i] = []; // aún no hay subcategoría
    });
  }

  // ===== Dependencias =====
  onCategoryChange(i: number, ev: any): void {
    const categoryId = Number(ev?.detail?.value ?? ev?.target?.value);
    const itemFG = this.servicesFA.at(i) as FormGroup;

    this.itemsFAAt(i).clear();
    this.itemsFAAt(i).push(this.createItemGroup());

    if (!categoryId) {
      this.subcategoriesByIndex[i] = [];
      itemFG.patchValue({ subcategoryId: null, subcategoryName: null }, { emitEvent: false });
      return;
    }

    this.categoryService.findAllSubCategory(categoryId).subscribe((subs: SubcategoryDto[]) => {
      this.subcategoriesByIndex[i] = subs ?? [];
      itemFG.patchValue({ subcategoryId: null, subcategoryName: null }, { emitEvent: false });
    });
  }

  onSubcategoryChange(i: number, ev: any): void {
    this.itemsFAAt(i).clear();
    this.itemsFAAt(i).push(this.createItemGroup());
    const subcategoryId = Number(ev?.detail?.value ?? ev?.target?.value);
    const itemFG = this.servicesFA.at(i) as FormGroup;
    if (!subcategoryId) return;

    if (this.isSubcategoryTaken(subcategoryId, i)) {
      itemFG.patchValue({ subcategoryId: null, subcategoryName: null }, { emitEvent: false });
      return;
    }

    const selected = this.subcategoriesByIndex[i]?.find(sc => Number(sc.id) === subcategoryId);
    const subcategoryName = selected?.name ?? null;
    itemFG.patchValue({ subcategoryId, subcategoryName }, { emitEvent: false });
    this.preloadItemsFromSubcategory(i, selected);
  }

  private preloadItemsFromSubcategory(i: number, subcategory: Partial<SubcategoryDto> | any): void {
    const itemsFA = this.itemsFAAt(i);
    itemsFA.clear();

    const list = Array.isArray(subcategory?.subcategoryServices)
      ? subcategory.subcategoryServices
      : [];

    if (!list.length) {
      itemsFA.push(this.createItemGroup());
      return;
    }

    for (const s of list) {
      itemsFA.push(this.createItemGroup({
        name: s?.name ?? '',
        description: s?.description ?? '',
      }));
    }

    const serviceFG = this.servicesFA.at(i) as FormGroup;
    if (subcategory?.img && !serviceFG.get('img')?.value) {
      serviceFG.patchValue({ img: subcategory.img }, { emitEvent: false });
    }
  }

  // ===== Precio (formatea visualmente, guarda número) =====
  onPriceInput(i: number, k: number, event: any): void {
    let rawValue = typeof event === 'string' ? event : event?.target?.value ?? '';
    const numericValue = rawValue.replace(/\D/g, '');
    const valueAsNumber = numericValue ? parseFloat(numericValue) : 0;
    const formatted = numericValue ? valueAsNumber.toLocaleString('es-CO') : '';
    if (event?.target) event.target.value = formatted;

    const itemFG = this.itemsFAAt(i).at(k) as FormGroup;
    itemFG.get('price')?.setValue(valueAsNumber, { emitEvent: false });
  }

  // ===== Marcado de ítems inválidos al Guardar =====
  private touchItemsForValidation(): void {
    this.servicesFA.controls.forEach((svcCtrl) => {
      const svc = svcCtrl as FormGroup;
      const items = svc.get('items') as FormArray;
      items.controls.forEach((itCtrl: AbstractControl) => {
        const fg = itCtrl as FormGroup;
        fg.get('name')?.markAsTouched();
        fg.get('serviceTime')?.markAsTouched();
        fg.get('price')?.markAsTouched();
        fg.get('description')?.markAsTouched();
        fg.updateValueAndValidity({ onlySelf: false, emitEvent: false });
      });
    });
  }

  private buildDtos(): ServiceCreateDto[] {
    const root = this.servicesForm.getRawValue();

    // providerId raíz (de la ruta / del form root)
    const rootProviderId =
      root.providerId != null && root.providerId !== ''
        ? Number(root.providerId)
        : this.providerId;

    // Helper: toma providerId del acordeón; si no hay, usa el root
    const getProviderForService = (svc: any) => {
      const local = svc?.providerId;
      const n = Number(local);
      return Number.isFinite(n) && n > 0 ? n : (rootProviderId ?? null);
    };

    const result: ServiceCreateDto[] = [];

    (root.services ?? []).forEach((v: any) => {
      const base = {
        img: v.img || null,
        providers: getProviderForService(v),                                // ⬅️ aquí
        subcategory: v.subcategoryId != null ? Number(v.subcategoryId) : null, // ⬅️ igual
      };

      if (Array.isArray(v.items) && v.items.length) {
        v.items.forEach((it: any) => {
          result.push({
            ...base,
            name: it.name?.trim(),
            description: it.description?.trim() || null,
            serviceTime: it.serviceTime || null,
            price: it.price != null ? Number(it.price) : null,
          } as ServiceCreateDto);
        });
      } else {
        // compatibilidad si no hay items
        result.push({
          ...base,
          name: v.name?.trim(),
          description: v.description?.trim() || null,
          serviceTime: v.serviceTime || null,
          price: v.price != null ? Number(v.price) : null,
        } as ServiceCreateDto);
      }
    });

    return result;
  }

  private buildDtoAt(index = 0): ServiceCreateDto {
    const dtos = this.buildDtos();
    return dtos[index];
  }

  onSubmit(): void {
    this.touchItemsForValidation();

    if (this.servicesForm.invalid) {
      this.servicesForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    if (this.isEditMode && this.serviceId) {
      const dto = this.buildDtoAt(0);
      this.servicesService.update(this.serviceId, dto).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/services']); },
        error: (err) => { console.error('Error actualizando servicio', err); this.submitting = false; }
      });
      return;
    }

    const dtos = this.buildDtos();
    if (!dtos.length) { this.submitting = false; return; }

    const anyService = this.servicesService as any;
    const req$ = typeof anyService.createMany === 'function'
      ? anyService.createMany(dtos)
      : forkJoin(dtos.map((d: ServiceCreateDto) => this.servicesService.create(d)));

    req$.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate([`navigation/profile/${this.providerId}/users/${usersData().id}`]);
      },
      error: (err: any) => { console.error('Error guardando servicios', err); this.submitting = false; }
    });
  }

  cancel(): void { this.router.navigate(['/services']); }

  trackByIndex = (_: number, ctrl: any) => ctrl;
}
