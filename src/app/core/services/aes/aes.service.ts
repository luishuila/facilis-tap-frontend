import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class AesService {
  // private readonly secretKey = 'MY_SECRET_KEY_32_BYTES'; 


  encryptData<T>(data: T , secretKey:string = 'MY_SECRET_KEY_32_BYTES' ): ApiResponse<T> {
    const parsedData: ApiResponse<T> = typeof data === 'string' ? JSON.parse(data) : data;
    return parsedData;
    // try {

      

    //   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    //   console.log('🔐 Datos encriptados:', encryptedData);
    //   return encryptedData;
    // } catch (error) {
    //   console.error('❌ Error al encriptar datos:', error);
    //   return '';
    // }
  }

  decryptData<T>(encryptedData: string, secretKey:string = 'MY_SECRET_KEY_32_BYTES'): ApiResponse<T> | null {
    try {
      const parsedData:any = encryptedData;
      return parsedData;

      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedString) {
        throw new Error('No se pudo convertir la data desencriptada a texto');
      }

      const decryptedData: ApiResponse<T> = JSON.parse(decryptedString);
      return decryptedData;
    } catch (error) {
      console.error('❌ Error al desencriptar:', error);
      return null;
    }
  }
}
