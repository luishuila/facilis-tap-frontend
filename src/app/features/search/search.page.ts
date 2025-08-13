import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
    standalone: false,

})
export class SearchPage implements OnInit {
  isFullScreen: boolean = false;

  toggleMapFullscreen() {
    this.isFullScreen = !this.isFullScreen;
  }
  

  ngOnInit(): void {}
}
