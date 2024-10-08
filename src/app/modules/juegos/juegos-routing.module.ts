import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { CodigoSecretoComponent } from './componentes/codigo-secreto/codigo-secreto.component';
import { TopResultadosComponent } from './componentes/top-resultados/top-resultados.component';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: 'mayor-o-menor',
    component: MayorOMenorComponent
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent
  },
  {
    path: 'codigo-secreto',
    component: CodigoSecretoComponent
  },
  { path: ':juegoId/mejores-puntajes',
    component: TopResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
