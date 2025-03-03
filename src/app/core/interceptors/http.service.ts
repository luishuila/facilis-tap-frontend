import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, defer } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('/login') || req.url.includes('/register')) {
      console.log('Skipping token for login request');
      return next.handle(req).pipe(
        catchError(error => this.handleError(error))
      );
    }

    return defer(() => this.authService.getAccessToken()).pipe(
      switchMap(token =>
        defer(() => this.loadingCtrl.create({ message: 'Cargando...', spinner: 'crescent' })).pipe(
          switchMap(loading => {
            loading.present();

            let clonedReq = req;
            if (token?.access_token) {
              clonedReq = req.clone({ setHeaders: { Authorization: `Bearer ${token.access_token}` } });
            }

            return next.handle(clonedReq).pipe(
              tap(event => console.log('✅ Request processed:', event)),
              catchError(error => this.handleError(error)),
              finalize(() => loading.dismiss())
            );
          })
        )
      )
    );
  }

  private async handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400: errorMessage = 'Solicitud incorrecta. Verifica los datos ingresados.'; break;
        case 401: errorMessage = 'No autorizado. Inicia sesión nuevamente.'; await this.authService.logout(); break;
        case 403: errorMessage = 'Acceso denegado.'; break;
        case 404: errorMessage = 'Recurso no encontrado.'; break;
        case 500: errorMessage = 'Error en el servidor. Intenta más tarde.'; break;
        default: errorMessage = `Error inesperado (Código: ${error.status}).`;
      }
    }

    if (!navigator.onLine) errorMessage = 'Sin conexión a Internet.';
    console.log()
    const toast = await this.toastCtrl.create({ message: `${errorMessage} ${error.error.message}` , duration: 3000, position: 'bottom', color: 'danger' });
    await toast.present();

    return throwError(() => error);
  }
}
