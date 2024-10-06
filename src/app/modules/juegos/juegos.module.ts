import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { CodigoSecretoComponent } from './componentes/codigo-secreto/codigo-secreto.component';
import { TopResultadosComponent } from './componentes/top-resultados/top-resultados.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    CodigoSecretoComponent,
    TopResultadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HeaderComponent,
    FormsModule
  ]
})
export class JuegosModule { }
