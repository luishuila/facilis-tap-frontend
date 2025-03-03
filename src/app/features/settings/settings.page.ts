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
    { label: 'Search', link: '/navigation/search', icon: 'search' },
    { label: 'Configuracion', link: '/navigation/personalinformation', icon: 'search' },
    { label: 'Centro de Gestión', link: '/navigation/administratormenu', icon: 'library'},
    { label: 'Settings', link: '/settings', icon: 'settings' }
  ];
  data:any
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      this.data = JSON.parse(storedUser);
     console.log(this.data)
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']); 
  }
}
