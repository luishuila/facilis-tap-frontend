import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

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
    { tab: 'home', link: '/navigation/home', icon: 'home', label: 'Home', roles: ['User'] },
    { tab: 'quote', link: '/navigation/quote', icon: 'calendar', label: 'Quote', roles: ['User'] },
    { tab: 'employee', link: '/navigation/employee', icon: 'person', label: 'Employee', roles: ['Employee'] },
    { tab: 'provider', link: '/navigation/provider', icon: 'business', label: 'Provider', roles: ['Administrator'] },
    { tab: 'administrator', link: '/navigation/administrator', icon: 'person-circle', label: 'Administrator', roles: ['Administrator'] },
    { tab: 'settings', link: '/navigation/settings', icon: 'menu', label: 'Menu', roles: ['User'] }
  ];

  constructor() {}

  ngOnInit() {

    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      this.menu = JSON.parse(storedUser);
      this.userRoles = this.menu.roles.map((r: any) => r.name); 
    }

    this.loadTabs();
  }

  private loadTabs() {
    // 🔹 Filtrar pestañas según los roles del usuario
    this.tabItems = this.allTabs.filter(tab =>
      tab.roles.some(role => this.userRoles.includes(role)) 
    );
  }
}