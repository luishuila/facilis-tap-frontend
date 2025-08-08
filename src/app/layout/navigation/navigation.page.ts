import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { roleEnum } from 'src/app/core/constant/enum';
import { MenuService } from 'src/app/core/services/util/menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
  standalone: false,
})
export class NavigationPage implements OnInit {

  menu: any;
  userRoles: string[] = []; 
  tabItems: any[] = [];



  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.menuTabs$.subscribe(tabs => {
      this.tabItems = tabs;
    });

  }

  private loadTabs() {

  
  }
}