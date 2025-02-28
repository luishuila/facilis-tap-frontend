import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
  standalone: false,
})
export class NavigationPage implements OnInit {


  constructor(private menuCtrl: MenuController) {}

  openMenu() {
    this.menuCtrl.open(); 
  }
  ngOnInit() {
  }

}
