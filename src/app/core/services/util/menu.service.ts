import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { roleEnum } from 'src/app/core/constant/enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuTabsSubject = new BehaviorSubject<any[]>([]);
  menuTabs$ = this.menuTabsSubject.asObservable();

  private allTabs = [
    { tab: 'home', link: '/navigation/home', icon: 'home', label: 'Home', roles: [roleEnum.USER] },
    { tab: 'quote', link: '/navigation/quote', icon: 'calendar', label: 'Quote', roles: [roleEnum.USER] },
    { tab: 'employee', link: '/navigation/employee', icon: 'person', label: 'Employee', roles: [roleEnum.USER] },
    { tab: 'provider', link: '/navigation/provider', icon: 'business', label: 'Provider', roles: [roleEnum.ADMINISTRATOR,roleEnum.USER] },
    { tab: 'administrator', link: '/navigation/administrator', icon: 'person-circle', label: 'Administrator', roles: [roleEnum.ADMINISTRATOR,roleEnum.USER] },
    { tab: 'settings', link: '/navigation/settings', icon: 'menu', label: 'Settings', roles: [roleEnum.USER] }
  ];

  constructor() {
    this.loadInitialMenu();
  }

  loadInitialMenu() {
    const storedUser = localStorage.getItem('users');
    const userRoles = storedUser ? JSON.parse(storedUser).roles.map((r: any) => r.role) : [];
    this.updateMenu(userRoles);
  }

  updateUserRoles(userRoles: string[]) {
    this.updateMenu(userRoles);
  }

  private updateMenu(userRoles: string[]) {
    const filteredTabs = this.allTabs.filter(tab => tab.roles.some(role => userRoles.includes(role))   )   ;
    //  this.menuTabsSubject.next(filteredTabs);
    this.menuTabsSubject.next(this.allTabs);
  }
}
