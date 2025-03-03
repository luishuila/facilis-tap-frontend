import { Component, OnInit } from '@angular/core';
interface MenuItem {
  label: string;
  link: string;
  icon: string;
}
@Component({
  selector: 'app-administrator-menu',
  templateUrl: './administrator-menu.page.html',
  styleUrls: ['./administrator-menu.page.scss'],
  standalone: false
})
export class AdministratorMenuPage implements OnInit {

  menuOpen: boolean = false; 
  menuItems: MenuItem[] = [
    { label: 'Inicia tu Negocio ', link: '/navigation/administratormenu/administrator-form', icon: 'home' },
    { label: 'Lista Todo tu negocio', link: '/navigation/quote', icon: 'chatbubble-ellipses-outline' },
  ];

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }


}
