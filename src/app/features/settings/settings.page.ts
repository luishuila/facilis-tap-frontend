import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

interface MenuItem {
  label: string;
  link: string|null;
  icon: string;
  item:MenuItem[]|null;
  key:any | null;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
    standalone: false,
})
export class SettingsPage implements OnInit {
  menuOpen: boolean = false; // Controla la apertura/cierre del menú
  menuItems = [
    { label: 'Home', link: '/navigation/home', icon: 'home', item: [], key: '' },
    { label: 'Search', link: '/navigation/search', icon: 'search', item: [], key: '' },
    { label: 'Configuración', link: '/navigation/personalinformation', icon: 'settings', item: [], key: '' },
    { label: 'Settings', link: '/settings', icon: 'settings', item: [], key: '' },
    { label: 'Inicia tu Negocio', link: '/navigation/admin', icon: 'briefcase-outline', item: [], key: 'administrator' },
    { label: 'Servicio independiente', link: '/navigation/employee-independent', icon: 'construct-outline', item: [], key: 'administrator' },
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
