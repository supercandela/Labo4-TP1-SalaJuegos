import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from './guards/auth.guard';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'sobremi', component: SobremiComponent, canActivate: [authGuard] },
  { path: 'encuesta-satisfaccion', component: EncuestaComponent, canActivate: [authGuard] },

  {
    path: 'juegos',
    loadChildren: () =>
      import('./modules/juegos/juegos.module').then((m) => m.JuegosModule),
    canActivate: [authGuard]
  },

  // { path: '**', component: HomeComponent }
];
