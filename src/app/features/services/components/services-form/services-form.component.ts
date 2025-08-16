import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { UsersService } from 'src/app/core/services/user/users.service';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
  standalone: false,
})
export class ServicesFormComponent implements OnInit {
  servicesForm!: FormGroup;

  // Estado
  isEditMode = false;                 // true cuando viene :serviceId
  serviceId: number | null = null;
  providerId: number | null = null;
  loading = false;
  submitting = false;

  // Catálogos
  providerInfo: ProviderDto | null = null;
  categoryAll: CategoryDto[] = [];

  /** Subcategorías por índice del item */
  subcategoriesByIndex: SubcategoryDto[][] = [];
  private employeesNameMap: Record<string, string> = {};
  private employeesAvatarMap: Record<string, string> = {};
  private searchedPaths = new Set<string>();
  employeeCodes: Record<string, string> = {};
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private servicesService: ServicesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    // Rutas: /services/:providerId (crear array) | /services/:providerId/edit/:serviceId (editar 1)
    this.providerId = this.toNumber(this.route.snapshot.paramMap.get('providerId'));
    this.serviceId = this.toNumber(this.route.snapshot.paramMap.get('serviceId'));
    this.isEditMode = !!this.serviceId;

    if (this.providerId) {
      this.servicesForm.patchValue({ providerId: this.providerId });
      // Si prefieres, puedes deshabilitarlo: this.servicesForm.get('providerId')?.disable();
    }

    this.loading = true;
    let providerData = this.providerId ? this.providerService.findOneProvedor(this.providerId ?? 0) : of<ProviderDto | null>(null)
    const categories = providerData.pipe(
      map((p) => p?.categories ?? [] as CategoryDto[])
    );
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

  private createServiceGroup(data?: Partial<ServiceCreateDto>): FormGroup {
    return this.fb.group({
      categoryId: [null, Validators.required],
      subcategoryId: [data?.subcategory ?? null, Validators.required],
      name: [data?.name ?? '', [Validators.required, Validators.maxLength(120)]],
      description: [data?.description ?? '', Validators.required],
      serviceTime: [data?.serviceTime ?? '', Validators.required],
      price: [data?.price ?? 0, [Validators.required, Validators.min(0)]],
      img: [data?.img ?? ''],
      employees: this.fb.array<string>([]),
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

  employeesFAAt(i: number): FormArray {
    return (this.servicesFA.at(i) as FormGroup).get('employees') as FormArray;
  }
  addEmployee(i: number, value = ''): void {
    this.employeesFAAt(i).push(this.fb.control(value));
  }
  removeEmployee(i: number, j: number): void {
    this.employeesFAAt(i).removeAt(j);
  }

  // ===== Unicidad de subcategorías =====
  /** IDs de subcategorías ya elegidas en otros ítems */
  private getSelectedSubcategoryIds(excludeIndex?: number): number[] {
    const ids: number[] = [];
    this.servicesFA.controls.forEach((ctrl, idx) => {
      if (excludeIndex != null && idx === excludeIndex) return;
      const id = (ctrl as FormGroup).get('subcategoryId')?.value;
      if (id != null) ids.push(Number(id));
    });
    return ids;
  }

  /** Lista filtrada para el item i (oculta subcategorías ya usadas en otros ítems) */
  getAvailableSubcategories(i: number): SubcategoryDto[] {
    const taken = new Set(this.getSelectedSubcategoryIds(i));
    return (this.subcategoriesByIndex[i] ?? []).filter(sc => !taken.has(Number(sc.id)));
  }

  private isSubcategoryTaken(id: number, excludeIndex: number): boolean {
    return this.getSelectedSubcategoryIds(excludeIndex).includes(Number(id));
  }

  // ===== Dependencias =====
  onCategoryChange(i: number, ev: any): void {
    const categoryId = Number(ev?.detail?.value ?? ev?.target?.value);
    const itemFG = this.servicesFA.at(i) as FormGroup;

    if (!categoryId) {
      this.subcategoriesByIndex[i] = [];
      itemFG.patchValue({ subcategoryId: null }, { emitEvent: false });
      return;
    }

    this.categoryService.findAllSubCategory(categoryId).subscribe((subs: SubcategoryDto[]) => {
      this.subcategoriesByIndex[i] = subs ?? [];
      // reset subcategoría al cambiar categoría
      itemFG.patchValue({ subcategoryId: null }, { emitEvent: false });
    });
  }

  /** Evita elegir una subcategoría duplicada; si ya está tomada, revierte a null */
  onSubcategoryChange(i: number, ev: any): void {
    const subcategoryId = Number(ev?.detail?.value ?? ev?.target?.value);
    const itemFG = this.servicesFA.at(i) as FormGroup;
    if (!subcategoryId) return;

    if (this.isSubcategoryTaken(subcategoryId, i)) {
      // ya está usada en otro item: revertimos
      itemFG.patchValue({ subcategoryId: null }, { emitEvent: false });
      // opcional: aquí podrías mostrar un toast
      console.warn('Esa subcategoría ya fue seleccionada en otro servicio.');
    }
  }

  // ===== Mapeo para edición (item 0) =====
  private patchServiceGroupFromModel(i: number, model: any): void {
    const itemFG = this.servicesFA.at(i) as FormGroup;
    const categoryId = model?.subcategory?.category?.id ?? model?.categoryId ?? null;

    const patchEmployees = () => {
      const fa = this.employeesFAAt(i);
      fa.clear();
      (model?.employees ?? []).forEach((e: string) => fa.push(this.fb.control(e)));
    };

    if (categoryId) {
      this.categoryService.findAllSubCategory(categoryId).subscribe((subs) => {
        this.subcategoriesByIndex[i] = subs ?? [];
        itemFG.patchValue({
          categoryId,
          subcategoryId: model?.subcategory?.id ?? model?.subcategoryId ?? null,
          name: model?.name ?? '',
          description: model?.description ?? '',
          serviceTime: model?.serviceTime ?? '',
          price: Number(model?.price ?? 0),
          img: model?.img ?? '',
        }, { emitEvent: false });
        patchEmployees();
      });
    } else {
      itemFG.patchValue({
        categoryId: null,
        subcategoryId: null,
        name: model?.name ?? '',
        description: model?.description ?? '',
        serviceTime: model?.serviceTime ?? '',
        price: Number(model?.price ?? 0),
        img: model?.img ?? '',
      }, { emitEvent: false });
      this.subcategoriesByIndex[i] = [];
      patchEmployees();
    }
  }

  // ===== Precio (formatea visualmente, guarda número) =====
  onPriceInput(i: number, event: any): void {
    let rawValue = typeof event === 'string' ? event : event?.target?.value ?? '';
    const numericValue = rawValue.replace(/\D/g, '');
    const valueAsNumber = numericValue ? parseFloat(numericValue) : 0;
    const formatted = numericValue ? valueAsNumber.toLocaleString('es-CO') : '';
    if (event?.target) event.target.value = formatted;

    const itemFG = this.servicesFA.at(i) as FormGroup;
    itemFG.get('price')?.setValue(valueAsNumber, { emitEvent: false });
  }

  // ===== Build DTOs =====
  private buildDtos(): ServiceCreateDto[] {
    const root = this.servicesForm.getRawValue();
    const providerId = root.providerId ? Number(root.providerId) : this.providerId;

    // DEVUELVE UN ARRAY PURO: ServiceCreateDto[]
    return (root.services ?? []).map((v: any) => ({
      name: v.name?.trim(),
      description: v.description?.trim() || null,
      serviceTime: v.serviceTime || null,
      price: v.price != null ? Number(v.price) : null,
      img: v.img || null,
      providers: providerId ?? null,
      subcategory: v.subcategoryId ? Number(v.subcategoryId) : null,
      employees: (v.employees ?? []).filter((e: string) => !!e && e.trim().length > 0),
    } as ServiceCreateDto));
  }

  private buildDtoAt(index = 0): ServiceCreateDto {
    const dtos = this.buildDtos();
    return dtos[index];
  }

  // ===== Guardar =====
  onSubmit(): void {
    if (this.servicesForm.invalid) {
      this.servicesForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    if (this.isEditMode && this.serviceId) {
      // EDITA SOLO EL PRIMER ITEM
      const dto = this.buildDtoAt(0);
      this.servicesService.update(this.serviceId, dto).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/services']); },
        error: (err) => { console.error('Error actualizando servicio', err); this.submitting = false; }
      });
      return;
    }

    // CREA EN MASA (ARRAY PURO)
    const dtos = this.buildDtos(); // <- AQUÍ ESTÁ EL ARRAY []
    console.log('dtos--->', dtos)
    //profiles/:providerId/users/:userId
    if (!dtos.length) { this.submitting = false; return; }

    const anyService = this.servicesService as any;
    const req$ = typeof anyService.createMany === 'function'
      ? anyService.createMany(dtos)                    // POST body = []
      : forkJoin(dtos.map((d: ServiceCreateDto) => this.servicesService.create(d))); // fallback

    req$.subscribe({
      next: () => { this.submitting = false; this.router.navigate([`navigation/profile/${this.providerId}/users/${usersData().id}`]); },
      error: (err: any) => { console.error('Error guardando servicios', err); this.submitting = false; }
    });
  }

  cancel(): void {
    this.router.navigate(['/services']);
  }

  // trackBy para rendimiento
  trackByIndex = (_: number, __: any) => _;

  private ctrlPath(i: number, j: number): string { return `${i}:${j}`; }
  private normalizeKey(v: any): string { return (v ?? '').toString().trim().toLowerCase(); }
  private getEmployeeRawValue(i: number, j: number): string {
    return (this.employeesFAAt(i).at(j)?.value ?? '').toString();
  }

  isSearched(i: number, j: number): boolean {
    return this.searchedPaths.has(this.ctrlPath(i, j));
  }

  searchEmployee(i: number, j: number): void {
    
    const raw = this.getEmployeeRawValue(i, j);
    const key = this.normalizeKey(raw);
    console.log('Buscar empleado:', { raw, key });

    this.userService.findByEmailPhone(key).subscribe({
      next: (user) => { 
        console.log('Usuario encontrado:', user);
      }})
    this.searchedPaths.add(this.ctrlPath(i, j));
      
    if (!key) return;
    let users = null;
    this.userService.findByEmailPhone(key).subscribe({
      next: (user) => {
        users = user; 
       this.submitting = false; 
       this.employeesNameMap[key] = `Nombre ${user.name.toUpperCase()} ${user.nickname?.toUpperCase()}`;
       this.employeesAvatarMap[key] = `${user.img}`; 
        console.log('Usuario encontrado:', user);
      }})
    // Aquí conectar tu servicio real
    // setTimeout(() => {
    //   this.employeesNameMap[key] = `Empleado ${key.toUpperCase()}`;
    //   this.employeesAvatarMap[key] = 'assets/img/avatar-placeholder.png'; // o URL real
    // }, 300);
  }

  getEmployeeName(i: number, j: number): string {
    const key = this.normalizeKey(this.getEmployeeRawValue(i, j));
    return this.employeesNameMap[key] || '';
  }

  getEmployeeAvatar(i: number, j: number): string {
    const key = this.normalizeKey(this.getEmployeeRawValue(i, j));
    return this.employeesAvatarMap[key] || 'assets/img/avatar-placeholder.png';
  }

}
