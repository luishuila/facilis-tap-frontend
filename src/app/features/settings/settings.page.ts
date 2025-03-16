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
  menuItems: MenuItem[] = [
    { label: 'Home', link: '/navigation/home', icon: 'home', item:[ ] , key:''},
    { label: 'Search', link: '/navigation/search', icon: 'search',item:[] , key:''},
    { label: 'Configuracion', link: '/navigation/personalinformation', icon: 'search' ,item:[], key:''},
    { label: 'Settings', link: '/settings', icon: 'settings' ,item:[],  key:''},
    { label: 'Centro de Gestión', link: null,  icon: 'library' , key:'' , item:[
      { label: 'Inicia tu Negocio', link: '/navigation/admin', icon: 'settings' ,item:[] ,  key:'administrator'}
    ]},
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
