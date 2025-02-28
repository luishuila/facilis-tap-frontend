import { Component, OnInit , Input } from '@angular/core';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}
@Component({
  selector: 'app-homedos',
  templateUrl: './homedos.page.html',
  styleUrls: ['./homedos.page.scss'],
  standalone: false,
})
export class HomedosPage implements OnInit {
  menuOpen: boolean = false; // Controla la apertura/cierre del menú
  menuItems: MenuItem[] = [
    { label: 'Home', link: '/layout/navigation/home', icon: 'home' },
    { label: 'Quote', link: '/layout/navigation/quote', icon: 'chatbubble-ellipses-outline' },
    { label: 'Radio', link: '/layout/navigation/radio', icon: 'radio' },
    { label: 'Library', link: '/layout/navigation/library', icon: 'library' },
    { label: 'Search', link: '/layout/navigation/search', icon: 'search' },
    { label: 'Settings', link: '/settings', icon: 'settings' }
  ];

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna la visibilidad del menú
  }

}
