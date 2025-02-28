import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform,  private router: Router) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Solo ejecuta el plugin StatusBar si la plataforma es nativa
      if (Capacitor.isNativePlatform()) {
        try {
          StatusBar.setOverlaysWebView({ overlay: false });
          StatusBar.setStyle({ style: Style.Light });
        } catch (error) {
          console.warn('StatusBar plugin error:', error);
        }

        // Maneja el botón de retroceso en Android
        App.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack) {
            this.router.navigate(['/home'], { replaceUrl: true });

          } else {
            App.exitApp();
          }
        });
      }
    });
  }




  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Evita que la interfaz llegue hasta la barra de estado
  //     StatusBar.setOverlaysWebView({ overlay: false });
  //     // App.addListener('backButton', ({ canGoBack }) => {
  //     //   if (canGoBack) {
  //     //     window.history.back();
  //     //   } else {
  //     //     App.exitApp();
  //     //   }
  //     // });
  //     // // Opcional: Cambiar el estilo de la barra de estado
  //     // StatusBar.setStyle({ style: Style.Light }); // Light para texto oscuro
  //     // // StatusBar.setStyle({ style: Style.Dark }); // Dark para texto claro
  //   });
  // }
}