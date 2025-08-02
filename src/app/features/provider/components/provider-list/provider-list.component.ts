import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { pin, share, trash } from 'ionicons/icons';
import { ProviderDto } from 'src/app/core/models/provider/ProviderI';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
  standalone: false,
})
export class ProviderListComponent  implements OnInit {

  providerList:ProviderDto[] = [];

  constructor(private providerService:ProviderService) {
    addIcons({ pin, share, trash });
    this.providerService.findOneAll().subscribe(data=>{
      this.providerList = data})
   }

  ngOnInit() {}

}
