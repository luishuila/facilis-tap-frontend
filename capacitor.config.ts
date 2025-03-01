import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'facilistap',
  webDir: 'www',
  server: {
    androidScheme: 'http', // ✅ NO usar 'https' si la API usa HTTP
    cleartext: true, // ✅ Habilita peticiones HTTP en desarrollo
    allowNavigation: ['192.168.1.120', '10.0.2.2'] // ✅ Permitir acceso desde el emulador
  }
};

export default config;
