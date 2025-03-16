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

  private allTabs = [
    { tab: 'home', link: '/navigation/home', icon: 'home', label: 'Home', roles: [roleEnum.USER] },
    { tab: 'quote', link: '/navigation/quote', icon: 'calendar', label: 'Quote', roles: [roleEnum.USER] },
    { tab: 'employee', link: '/navigation/employee', icon: 'person', label: 'Employee', roles: [roleEnum.EMPLOYEE] },
    { tab: 'provider', link: '/navigation/provider', icon: 'business', label: 'Provider', roles: [roleEnum.ADMINISTRATOR] },
    { tab: 'administrator', link: '/navigation/administrator', icon: 'person-circle', label: 'Administrator', roles: [roleEnum.ADMINISTRATOR] },
    { tab: 'settings', link: '/navigation/settings', icon: 'menu', label: 'Menu', roles: [roleEnum.USER] }
  ];

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.menuTabs$.subscribe(tabs => {
      this.tabItems = tabs;
    });
    // const storedUser = localStorage.getItem('users');
    // if (storedUser) {
    //   this.menu = JSON.parse(storedUser);
    //   this.userRoles = this.menu.roles.map((r: any) => r.role); 
    // }

    // this.loadTabs();
  }

  private loadTabs() {
    // this.tabItems = this.allTabs.filter(tab =>
    //   tab.roles.some(role => this.userRoles.includes(role))
    // );
    
  }
}