import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent implements OnInit {
  idMazo: string = '';
  cartaActual: any;
  cartaSiguiente: any;

  constructor (
    private cartasService: CartasService
    
  ) {

  }

  ngOnInit () {
    this.cartasService.getMazoId()
    .subscribe(mazo => {
      console.log(mazo);
      this.idMazo = mazo.deck_id;
      console.log(this.idMazo);
    });
  }

  pedirCarta () {
    this.cartasService.getCartas(this.idMazo);
  }

}
