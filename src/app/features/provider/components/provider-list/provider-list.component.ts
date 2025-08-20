import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { pin, share, trash } from 'ionicons/icons';
import { usersData } from 'src/app/core/generate/idData';
import { ProviderDto } from 'src/app/core/models/provider/ProviderI';
import { ProviderService } from 'src/app/core/services/provider/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
  standalone: false,
})
export class ProviderListComponent implements OnInit {
  providerList: ProviderDto[] = [];

  // (legacy) demo items si los necesitas en otro lado
  items = [
    {
      tag: 'tag1',
      id: 30624700,
      left: 'This is content left',
      right: 'This is content right',
      imgUrl: 'assets/imgs/sample-thumb.png',
    },
  ];

  constructor(private providerService: ProviderService, private router: Router) {
    addIcons({ pin, share, trash });
    this.providerService.findOneAll().subscribe((data) => {
      this.providerList = data;
    });
  }

  ngOnInit() {}

  /* =========================
     Handlers que <fac-list> espera
     ========================= */

  // (select)="onSelectProvider($event)  provider-admin/:id"
  onSelectProvider(item: ProviderDto) {
    this.onSelect(item);
  }

  // (chevron)="onChevronProvider($event)"
  onChevronProvider(item: ProviderDto) {
   this.router.navigate([`navigation/profile/${item.id}/users/${usersData().id}`]);
    console.log('chevron provider', item);
  }

  // (action)="onProviderAction($event)"
  onProviderAction(evt: { action: string; item: ProviderDto }) {
    const { action, item } = evt;
    switch (action) {
      case 'update':
        this.onUpdate(item); // ev opcional
        break;
      case 'register':
        this.onRegisterService(item);
        break;
      case 'create':
        this.onCreateEmployee(item);
        break;
      default:
        console.warn('Acción no manejada:', action, item);
    }
  }

  /* =========================
     Métodos internos existentes
     (ev ahora es opcional para reusarlos)
     ========================= */

  onSelect(item: ProviderDto) {
    console.log('tap', item);
  }

  onChevron(item: ProviderDto, ev?: Event) {
    ev?.stopPropagation();
    console.log('chevron tap', item);
  }

  onUpdate(item: ProviderDto, ev?: Event) {
    ev?.stopPropagation();
    this.router.navigate([`navigation/provider-admin/${item.id}`]);
    console.log('Actualizar', item);
    // TODO: navegar / modal / servicio
  }

  onRegisterService(item: ProviderDto, ev?: Event) {
    ev?.stopPropagation();
    console.log('Registrar servicio', item);
      this.router.navigate([`navigation/services/${item.id}`]);
    // TODO
  }

  onCreateEmployee(item: ProviderDto, ev?: Event) {
    ev?.stopPropagation();
    console.log('Crear empleado', item);
    // TODO
  }
}
