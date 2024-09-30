import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: "full" },

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'sobremi', component: SobremiComponent },

    {
        path: 'juegos',
        loadChildren: ()=> import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    }

    // { path: '**', component: HomeComponent }
];

