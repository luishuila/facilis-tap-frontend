import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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
    { label: 'Library', link: '/navigation/library', icon: 'library'},
    { label: 'Search', link: '/navigation/search', icon: 'search' },
    { label: 'Configuracion', link: '/navigation/personalinformation', icon: 'search' },
    { label: 'Settings', link: '/settings', icon: 'settings' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']); 
  }
}
