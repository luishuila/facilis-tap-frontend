import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressService } from 'src/app/core/services/address/address.service';
import { Subscription, map, distinctUntilChanged, tap, filter, switchMap } from 'rxjs';

type CountryVm = { countryCode: string; countryName: string };
type DeptVm    = { stateCode: string; stateName: string };
type CityVm    = { id: number | string; cityName: string };

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: false,
})
export class AddressFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() addressForm!: FormGroup;
  @Input() propertyType: { value: string; label: string }[] = [];
  @Input() isDisabled = false;
  @Output() addressSaved = new EventEmitter<any>();
  @Input() isUpdate = false;
  countries: CountryVm[] = [];
  departments: DeptVm[] = [];
  cities: CityVm[] = [];

  errorMessage = '';
  private subs = new Subscription();
  private countriesLoaded = false;

  constructor(private addressService: AddressService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCountries();

    // === Suscripciones reactivas seguras ===
    const country$ = this.addressForm.get('countryCode')?.valueChanges!;
    const state$   = this.addressForm.get('stateCode')?.valueChanges!;

    // país -> departamentos
    this.subs.add(
      country$
        .pipe(
          map(v => this.normalizeCountry(v)),
          distinctUntilChanged(),
          tap(() => {
            // limpiar dependencias
            this.departments = [];
            this.cities = [];
            this.addressForm.get('stateCode')?.setValue(null, { emitEvent: false });
            this.addressForm.get('cityStates')?.setValue(null, { emitEvent: false });
            this.cdr.markForCheck();
          }),
          filter((code): code is string => !!code),
          switchMap((code) =>
            this.addressService.findDepartmentsByCountry(code).pipe(
              map((list: any[]) => (Array.isArray(list) ? list : []).map((d: any) => ({
                stateCode: d.stateCode ?? d.code ?? d.id ?? '',
                stateName: d.stateName ?? d.name ?? d.title ?? '',
              })))
            )
          )
        )
        .subscribe({
          next: deps => { this.departments = deps; this.cdr.markForCheck(); },
          error: e => { console.error(e); this.errorMessage = 'No se pudieron cargar los departamentos.'; }
        })
    );

    // departamento -> ciudades
    this.subs.add(
      state$
        .pipe(
          map(v => this.normalizeDept(v)),
          distinctUntilChanged(),
          tap(() => {
            this.cities = [];
            this.addressForm.get('cityStates')?.setValue(null, { emitEvent: false });
            this.cdr.markForCheck();
          }),
          filter((code): code is string => !!code),
          switchMap((code) =>
            this.addressService.findCityByDepartments(code).pipe(
              map((list: any[]) => (Array.isArray(list) ? list : []).map((ci: any) => ({
                id: ci.id ?? ci.cityId ?? ci.code ?? '',
                cityName: ci.cityName ?? ci.name ?? ci.title ?? '',
              })))
            )
          )
        )
        .subscribe({
          next: cities => { this.cities = cities; this.cdr.markForCheck(); },
          error: e => { console.error(e); this.errorMessage = 'No se pudieron cargar las ciudades.'; }
        })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressForm'] && this.addressForm && this.countriesLoaded) {
      this.hydrateFromFormValues();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ================= Helpers =================
  private loadCountries(): void {
    const sub = this.addressService.findCountry()
      .pipe(
        map((list: any[]) =>
          (Array.isArray(list) ? list : []).map((c: any) => ({
            countryCode: c.countryCode ?? c.code ?? c.id ?? '',
            countryName: c.countryName ?? c.name ?? c.title ?? '',
          }))
        )
      )
      .subscribe({
        next: data => {
          this.countries = data;
          this.countriesLoaded = true;
          this.cdr.markForCheck();
          this.hydrateFromFormValues();
        },
        error: e => {
          console.error(e);
          this.errorMessage = 'No se pudieron cargar los países.';
        }
      });
    this.subs.add(sub);
  }

  private hydrateFromFormValues(): void {
    const country = this.normalizeCountry(this.addressForm?.get('countryCode')?.value);
    const state   = this.normalizeDept(this.addressForm?.get('stateCode')?.value);
    if (!country) return;

    // cargar deps si no están
    this.addressService.findDepartmentsByCountry(country)
      .pipe(
        map((list: any[]) => (Array.isArray(list) ? list : []).map((d: any) => ({
          stateCode: d.stateCode ?? d.code ?? d.id ?? '',
          stateName: d.stateName ?? d.name ?? d.title ?? '',
        })))
      )
      .subscribe({
        next: (deps) => {
          this.departments = deps;
          this.cdr.markForCheck();

          if (state) {
            this.addressService.findCityByDepartments(state)
              .pipe(
                map((list: any[]) => (Array.isArray(list) ? list : []).map((ci: any) => ({
                  id: ci.id ?? ci.cityId ?? ci.code ?? '',
                  cityName: ci.cityName ?? ci.name ?? ci.title ?? '',
                })))
              )
              .subscribe({
                next: (cities) => { this.cities = cities; this.cdr.markForCheck(); },
                error: (e) => { console.error(e); this.errorMessage = 'No se pudieron cargar las ciudades.'; }
              });
          }
        },
        error: (e) => { console.error(e); this.errorMessage = 'No se pudieron cargar los departamentos.'; }
      });
  }

  // Normaliza por si fac-select entrega el objeto entero
  private normalizeCountry(v: any): string | null {
    if (!v) return null;
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    return v.countryCode ?? v.code ?? v.id ?? null;
  }
  private normalizeDept(v: any): string | null {
    if (!v) return null;
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    return v.stateCode ?? v.code ?? v.id ?? null;
  }

  // === Handlers opcionales si sigues usando (ionChange) en fac-select ===
  onCountrySelected(event: any, id: any): void {
    const raw = event?.detail?.value ?? event?.value ?? id ?? null;
    const value = this.normalizeCountry(raw);
    if (!value) return;
    this.addressForm.get('countryCode')?.setValue(value); // dispara valueChanges
  }

  onDepartmentsSelected(event: any, id: any): void {
    const raw = event?.detail?.value ?? event?.value ?? id ?? null;
    const value = this.normalizeDept(raw);
    if (!value) return;
    this.addressForm.get('stateCode')?.setValue(value); // dispara valueChanges
  }

  saveAddress(): void {
    if (this.addressForm.invalid) {
      Object.values(this.addressForm.controls).forEach((c: any) => c.markAsTouched());
      return;
    }
    this.addressSaved.emit(this.addressForm.value);
  }
}
