import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'saladejuegos-supercandela',
        appId: '1:812982235858:web:28aa8b74eae152a17a730b',
        storageBucket: 'saladejuegos-supercandela.appspot.com',
        apiKey: 'AIzaSyA2o03VK-adcyovRZ2FoLIXFdqLALylDJY',
        authDomain: 'saladejuegos-supercandela.firebaseapp.com',
        messagingSenderId: '812982235858',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
