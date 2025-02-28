import { Component, OnInit , Input } from '@angular/core';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
    standalone: false,
})
export class SettingsPage implements OnInit {
  menuOpen: boolean = false; // Controla la apertura/cierre del menú
  menuItems: MenuItem[] = [
    { label: 'Home', link: '/navigation/home', icon: 'home' },
    { label: 'Quote', link: '/navigation/quote', icon: 'chatbubble-ellipses-outline' },
    { label: 'Radio', link: '/navigation/radio', icon: 'radio' },
    { label: 'Library', link: '/navigation/library', icon: 'library' },
    { label: 'Search', link: '/navigation/search', icon: 'search' },
    { label: 'Settings', link: '/settings', icon: 'settings' }
  ];

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna la visibilidad del menú
  }
}
