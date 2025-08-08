import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, defer } from 'rxjs';
import { catchError, finalize, switchMap, tap, map } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AesService } from '../services/aes/aes.service';
import { usersData } from '../generate/idData';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private aesService: AesService 
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Intercept login/register requests (encryption logic may vary here)
    if (req.url.includes('/login') || req.url.includes('/register')) {
      console.log('🚀 Interceptando solicitud de login/register...');

      let clonedReq = req;
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        // Only encrypt if body is not FormData (let FormData pass through, e.g. file upload)
        if (!(req.body instanceof FormData)) {
          const encryptedBody = this.aesService.encryptData(req.body);
          clonedReq = req.clone({ body: { data: encryptedBody } });
        }
      }
      return next.handle(clonedReq).pipe(
        tap(event => console.log('🔹 Respuesta sin procesar:', event)), 
        map((event: any) => {
          if (event instanceof HttpResponse && event.body?.data) {
            try {
              const decryptedData = this.aesService.decryptData(event.body.data);
              return event.clone({ body: { ...event.body, data: decryptedData } });
            } catch (error) {
              console.error('❌ Error al desencriptar en login/register:', error);
            }
          }
          return event;
        }),
        catchError(error => this.handleError(error))
      );
    }

    // Other requests
    return defer(() => this.authService.getAccessToken()).pipe(
      switchMap(token =>
        defer(() => this.loadingCtrl.create({ message: 'Cargando...', spinner: 'crescent' })).pipe(
          switchMap(loading => {
            loading.present();

            let clonedReq = req;

            if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
              // Only encrypt if body is not FormData
              if (!(req.body instanceof FormData)) {
                const descript = usersData().id || 'MY_SECRET_KEY_32_BYTES';
                const data = this.aesService.encryptData(req.body, descript);
                clonedReq = req.clone({ body: { data: data } });
              }
            }

            // Set token and custom headers if needed
            if (token?.access_token) {
              clonedReq = clonedReq.clone({
                setHeaders: {
                  'key': usersData().id || 'MY_SECRET_KEY_32_BYTES',
                  Authorization: `Bearer ${token.access_token}`
                }
              });
            }

            return next.handle(clonedReq).pipe(
              tap(event => event),
              map(event => {
                if (event instanceof HttpResponse && event.body?.data) {
                  const descript = usersData().id || 'MY_SECRET_KEY_32_BYTES';
                  try {
                    const decryptedData = this.aesService.decryptData(event.body.data, descript);
                    return event.clone({ body: { ...event.body, data: decryptedData } });
                  } catch (error) {
                    console.error('❌ Error al desencriptar datos en respuesta global:', error);
                  }
                }
                return event;
              }),
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

    const toast = await this.toastCtrl.create({
      message: `${errorMessage} ${error.error.message || ''}`,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();

    return throwError(() => error);
  }
}
