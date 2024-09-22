import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';

export const routes: Routes = [
    
    { path: '', redirectTo: '/login', pathMatch: "full" },

    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sobremi', component: SobremiComponent },

    {
        path: 'juegos',
        loadChildren: ()=> import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    }

    // { path: '**', component: HomeComponent }
];

