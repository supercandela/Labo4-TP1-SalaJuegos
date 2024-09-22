import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { CodigoSecretoComponent } from './componentes/codigo-secreto/codigo-secreto.component';
import { HeaderComponent } from '../../components/header/header.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    CodigoSecretoComponent
  ],
  exports: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    CodigoSecretoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HeaderComponent
  ]
})
export class JuegosModule { }
