import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';

export const routes: Routes = [
    
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sobremi', component: SobremiComponent },
    

    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    // {
    //     path: 'products', component: ProductsComponent,
    //     children:
    //         [
    //             {
    //                 path: ":id",
    //                 component: ProductDetailComponent
    //             }
    //         ]
    // },
    // La ruta comodin debe ir siempre al final
    // { path: '**', component: PageNotFoundComponent },
];

