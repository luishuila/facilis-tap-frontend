import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genderObject } from 'src/app/core/constant/constants';
import { usersData } from 'src/app/core/generate/idData';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { UserDto, UserUpdate, UserUpdateI } from 'src/app/core/models/User/User';
import { AddressService } from 'src/app/core/services/address/address.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { Address } from 'src/app/core/models/address/Address';
import { ProviderCreateDto, ProviderDto } from 'src/app/core/models/provider/ProviderI';
import { IonSegment, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MenuService } from 'src/app/core/services/util/menu.service';
import { ProviderCreate } from 'src/app/core/models/provider/Provider';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericServiceService } from 'src/app/core/services/genericService/generic-service.service';
import { TypeItem } from 'src/app/core/models/util/util';
import { roleEnum } from 'src/app/core/constant/enum';
import { Subscription, take } from 'rxjs';
import { AddressCreate } from 'src/app/core/models/address/create-address.model';
import { data } from 'dom7';

@Component({
  selector: 'app-provider-admin',
  templateUrl: './provider-admin.page.html',
  styleUrls: ['./provider-admin.page.scss'],
  standalone: false
})
export class ProviderAdminPage implements OnInit, ViewWillEnter, ViewWillLeave {
  // Tabs
  selectedSegment: 'first' | 'register' | 'addressProvider' = 'first';
  subSegment: 'usersId' | 'addressId' = 'usersId';

  // Forms
  userForm!: FormGroup;
  addressForm!: FormGroup;
  providerForm!: FormGroup;
  addressProviderForm!: FormGroup;

  // Render / gating
  isUserReady = false;
  isAddressReady = false;
  isUserValid = false;
  isUserAddressValid = false;
  canOpenProvider = false;

  // Data
  addressId: number | null = 0;
  addressIdProvider: number | null = 0;
  propertyType: TypeItem<string>[] | [] = [];
  genderOptions = genderObject;
  user!: UserDto;
  providerId: number | undefined | null = null;
  // Proveedor
  dataProvider: ProviderCreate = new ProviderCreate();
  imgFile: File | null = null;
  fileCova: File[] | null = null;
  providerIdCreated?: number;
  addProveder = false;

  // Otros
  @ViewChild(IonSegment, { static: false }) segment!: IonSegment;
  independent: boolean = true;
  private isLoading = false;
  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private addressService: AddressService,
    private providerService: ProviderService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private genericService: GenericServiceService
  ) {
    this.independent = !usersData().validateRoles(roleEnum.INDEPENDENT);

  }

  // Construye formularios UNA vez
  ngOnInit() {
    this.buildForms();
  }

  // 👉 Se dispara CADA VEZ que entras a la página
  async ionViewWillEnter() {
    this.buildForms();
    this.providerId = this.toNumber(this.route.snapshot.paramMap.get('providerId'));
    console.log('Provider ID:', this.providerId);

    await this.reloadAll();
    if (this.providerId) {
      this.providerIdCreated = this.providerId;
      await this.findOneProvider(this.providerId ? String(this.providerId) : null);
    }

  }

  private findOneProvider(providerId: string | null = '') {
    this.providerService.findOne(providerId ?? '0').pipe(take(1)).subscribe({
      next: (data: ProviderDto) => {
        console.log('Provider data:', data);
        if (!data) return;
        this.providerForm.reset();
        this.providerForm.patchValue({
          ...data,
          categories: data.categories?.map(c => c.id) ?? [],
          independent: !usersData().validateRoles(roleEnum.INDEPENDENT),
        });

        this.addressProviderForm.reset();

        const address = (data.addresses?.[0] ?? {}) as Partial<AddressDtoI>;
        this.addressIdProvider = data.addresses?.[0]?.id ?? 0;
        console.log('address.cityStates?.id --->:', address.cityStates);
        this.addressProviderForm.patchValue({
          ...address,
          countryCode: address.countryCode ?? '',
          stateCode: address.stateCode ?? '',
          cityStates: address.cityStates?.id ?? null,
          lat: address.lat ?? '',
          lon: address.lon ?? '',
          street: address.street ?? '',
        });
      },
      error: (e) => console.error('Error cargando proveedor', e),
      complete: () => {
        this.isLoading = false;
        this.refreshValidityAndGating(true);
      }
    })
  }


  private toNumber(value: string | null): number | null {
    if (value == null) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  // Limpia subs/flags si sales
  ionViewWillLeave() {
    this.sub.unsubscribe();
    this.sub = new Subscription();
    this.isLoading = false;
  }

  private buildForms() {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')]],
      nit: [null, [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')]],
    });

    this.addressForm = this.fb.group({
      countryCode: [''],
      stateCode: [''],
      cityStates: [null],
      lat: ['', [Validators.required]],
      lon: [''],
      street: [''],
      race: [''],
      neighborhood: [''],
      description: [''],
      zipcode: [''],
      propertyType: [''],
    });

    this.providerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      phone: [''],
      img: [''],
      website: [''],
      nit: [null],
      invima: [''],
      companyIdentifier: [''],
      logoUrl: [''],
      description: [''],
      categories: [[]],
      independent: [!usersData().validateRoles(roleEnum.INDEPENDENT)],
    });

    this.addressProviderForm = this.fb.group({
      countryCode: [''],
      stateCode: [''],
      cityStates: [null],
      lat: [''],
      lon: [''],
      street: [''],
      race: [''],
      neighborhood: [''],
      description: [''],
      zipcode: [''],
      propertyType: [''],
    });
  }

  // 🔁 Recarga TODO al entrar
  private async reloadAll() {
    if (this.isLoading) return;
    this.isLoading = true;

    // Forzar re-montaje de hijos (para que corran sus ngOnInit otra vez)
    this.isUserReady = false;
    this.isAddressReady = false;

    // (re)carga catálogos que necesites siempre
    this.genericService.findAllPropertyType().pipe(take(1)).subscribe(d => this.propertyType = d);

    // Carga de usuario + dirección
    this.sub.add(
      this.userService.findOne(usersData().id).pipe(take(1)).subscribe({
        next: (data: UserDto) => {
          if (!data) return;

          // PERFIL
          this.userForm.reset(); // limpia antes de parchear
          this.userForm.patchValue({
            ...data,
            birth: data.birth ? new Date(data.birth).toISOString().split('T')[0] : '',
          });
          this.isUserReady = true; // ↩️ remonta <app-update-users-information>

          // DIRECCIÓN
          const address = (data.addresses?.[0] ?? {}) as Partial<AddressDtoI>;
          this.addressId = data.addresses?.[0]?.id ?? 0;

          this.addressForm.reset();
          this.addressForm.patchValue({
            countryCode: address.countryCode ?? '',
            stateCode: address.stateCode ?? '',
            cityStates: address.cityStates?.id ?? null,
            lat: address.lat ?? '',
            lon: address.lon ?? '',
            street: address.street ?? '',
            race: address.race ?? '',
            neighborhood: address.neighborhood ?? '',
            description: address.description ?? '',
            zipcode: address.zipcode ?? '',
            propertyType: address.propertyType ?? '',
          });
          this.isAddressReady = true; // ↩️ remonta <app-address-form>

          // Valida flujos
          this.refreshValidityAndGating(true); // con autoruteo
        },
        error: (e) => console.error('Error cargando usuario', e),
        complete: () => (this.isLoading = false),
      })
    );
  }

  private refreshValidityAndGating(autoRoute = false) {
    this.isUserValid = this.userForm.valid;
    this.isUserAddressValid = this.addressForm.valid;
    this.canOpenProvider = this.isUserValid && this.isUserAddressValid;

    if (!autoRoute) {
      if (!this.canOpenProvider) {
        this.selectedSegment = 'first';
        this.subSegment = !this.isUserValid ? 'usersId' : 'addressId';
      }
      return;
    }

    // Autoruteo
    if (!this.isUserValid) {
      this.selectedSegment = 'first';
      this.subSegment = 'usersId';
      return;
    }
    if (!this.isUserAddressValid) {
      this.selectedSegment = 'first';
      this.subSegment = 'addressId';
      return;
    }
    // Ambos válidos
    this.onSegment('register');
  }

  segmentChanged(event: any) {
    const value = event?.detail?.value as typeof this.selectedSegment;
    if ((value === 'register' || value === 'addressProvider') && !this.canOpenProvider) {
      this.selectedSegment = 'first';
      this.subSegment = !this.isUserValid ? 'usersId' : 'addressId';
      return;
    }
    if (value === 'first') {
      this.subSegment = !this.isUserValid ? 'usersId' : 'addressId';
    }
    this.selectedSegment = value;
  }

  // === Guardados (sin cambios relevantes) ===
  onUserSaved(userData?: UserUpdateI) {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const payload = new UserUpdate({ ...userData });
    this.userService.update(usersData().id, payload).pipe(take(1)).subscribe(() => {
      this.refreshValidityAndGating(true);
    });
  }

  onAddressSaved(address?: AddressDtoI) {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    const payload = new Address({ ...address });
    const obs =
      this.addressId && this.addressId !== 0
        ? this.addressService.update(this.addressId, payload)
        : this.addressService.post(payload);

    obs.pipe(take(1)).subscribe((res: any) => {
      if (!this.addressId || this.addressId === 0) this.addressId = res?.id ?? this.addressId;
      this.refreshValidityAndGating(true);
    });
  }

  onProviderFormSubmit(event: any) {
    if (this.providerForm.invalid) {
      this.providerForm.markAllAsTouched();
      return;
    }
    this.imgFile = event?.avatarFile ?? null;
    this.fileCova = event?.fileItems ?? null;
    this.dataProvider = new ProviderCreate({ ...(event?.data ?? {}), userId: usersData().id });
    if (this.providerForm.invalid) {
      this.providerForm.markAllAsTouched();
      return;
    }

    const base = new ProviderCreate({
      ...(event?.data ?? {}),
      userId: usersData().id
    });


    if (this.providerId) {
      this.updateProvider(this.providerId, base);
    } else {
      this.createProvider(base);
    }
  }
  private updateProvider(providerId: number, provider: ProviderCreateDto) {
    if (!this.canOpenProvider) return;

    const payload = new ProviderCreate({ ...provider, userId: usersData().id });
    this.addProveder = true;
    delete payload.addresses;
    this.providerService.update(this.providerId?.toString() ?? '', payload)
      .pipe(take(1))
      .subscribe({
        next: (response: ProviderDto) => {
          this.providerIdCreated = response.id ?? providerId;

          if (this.imgFile || this.fileCova) {
            this.providerService.updateImage(this.imgFile as any, this.fileCova as any, this.providerIdCreated)
              .pipe(take(1))
              .subscribe({
                next: () => this.afterProviderCreated(this.providerIdCreated),
                error: () => this.afterProviderCreated(this.providerIdCreated),
              });
          } else {
            this.afterProviderCreated(this.providerIdCreated);
          }
        },
        error: (err) => {
          console.error('Error actualizando proveedor', err);
          this.addProveder = false;
        }
      });

    if (this.providerId) {
      // this.router.navigate([`navigation/provider`]);
    }
  }

  private createProvider(provider: ProviderCreateDto) {
    if (!this.canOpenProvider) return;
    const payload = new ProviderCreate({ ...provider, userId: usersData().id });
    this.addProveder = true;
    payload.toJson().logoUrl = null;

    this.providerService.create(payload).pipe(take(1)).subscribe({
      next: (response: ProviderDto) => {
        this.providerIdCreated = response.id;
        localStorage.setItem('users', JSON.stringify(response.users?.[0] ?? {}));
        if (this.imgFile || this.fileCova) {
          this.providerService.updateImage(this.imgFile as any, this.fileCova as any, response.id)
            .pipe(take(1))
            .subscribe({ next: () => this.afterProviderCreated(response.id), error: () => this.afterProviderCreated(response.id) });
        } else {
          this.afterProviderCreated(response.id);
        }
      },
      error: (err) => { console.error('Error creando proveedor', err); this.addProveder = false; }
    });
  }

  private afterProviderCreated(providerId?: number) {
    this.onSegment('addressProvider');
    const addrUser = this.addressForm.getRawValue();
    this.addressProviderForm.patchValue({
      countryCode: addrUser.countryCode ?? '',
      stateCode: addrUser.stateCode ?? '',
      cityStates: addrUser.cityStates ?? null,
      lat: addrUser.lat ?? '',
      lon: addrUser.lon ?? '',
      street: addrUser.street ?? '',
      race: addrUser.race ?? '',
      neighborhood: addrUser.neighborhood ?? '',
      description: addrUser.description ?? '',
      zipcode: addrUser.zipcode ?? '',
      propertyType: addrUser.propertyType ?? '',
    });
    this.menuService.loadInitialMenu();
    this.addProveder = false;
  }

  onProviderAddressSubmit(addressProvider?: AddressDtoI) {
    if (this.addressProviderForm.invalid) {
      this.addressProviderForm.markAllAsTouched();
      return;
    }
    const payload = new AddressCreate({ ...(addressProvider ?? this.addressProviderForm.getRawValue()) });
    payload.providerId = this.providerId ?? this.providerIdCreated;
    // this.addressService.post(payload).pipe(take(1)).subscribe();

    console.log('this.payload--->:', payload);
    this.addressIdProvider && this.addressIdProvider !== 0
      ? this.addressService.update(this.addressIdProvider, payload).subscribe(data => { console.log('Address updated:', data); })
      : this.addressService.post(payload).subscribe(data => { console.log('Address updated:', data); });
    if (!this.providerId) {
      if (this.providerIdCreated) this.router.navigate([`navigation/services/${this.providerIdCreated}`]);
    } else {
      this.router.navigate([`navigation/provider`]);
    }


  }

  onSegment(value: 'first' | 'register' | 'addressProvider') {
    setTimeout(() => {
      if (this.segment) this.segment.value = value;
      this.selectedSegment = value;
    }, 150);
  }
}
