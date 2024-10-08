import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-resultados',
  templateUrl: './top-resultados.component.html',
  styleUrl: './top-resultados.component.css',
})
export class TopResultadosComponent implements OnInit, OnDestroy {
  juegoId!: string;
  isCodigoSecreto: boolean = false;
  tituloPantalla: string = '';
  coleccionAObtener: string = '';
  sub?: Subscription;
  mejoresJugadores?: Array<any>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    // Obtener el parámetro 'juegoId' de la URL
    this.juegoId = this.route.snapshot.paramMap.get('juegoId') || '';
    this.obtenerPuntajes(this.juegoId);
  }

  obtenerPuntajes(juegoId: string) {
    switch (juegoId) {
      case 'ahorcado':
        this.tituloPantalla = 'Ahorcado';
        this.coleccionAObtener = 'topAhorcado';
        break;
      case 'mayor-o-menor':
        this.tituloPantalla = 'Mayor o Menor';
        this.coleccionAObtener = 'topMayorOMenor';
        break;
      case 'preguntados':
        this.tituloPantalla = 'Preguntados';
        this.coleccionAObtener = 'topPreguntados';
        break;
      case 'codigo-secreto':
        this.isCodigoSecreto = true;
        this.tituloPantalla = 'Código Secreto';
        this.coleccionAObtener = 'topCodigoSecreto';
        break;
    }

    let col = collection(this.firestore, this.coleccionAObtener);
    const observable = collectionData(col);
    this.sub = observable.subscribe((respuesta: any) => {
      if (this.isCodigoSecreto) {
        this.mejoresJugadores = respuesta.sort((a: any, b: any) => {
          if (b.tiempo !== a.tiempo) {
            return a.tiempo - b.tiempo;
          }
          //Si el puntaje es igual, ordeno por fecha
          const fechaA = new Date(`${a.dia}T${a.hora}`);
          const fechaB = new Date(`${b.dia}T${b.hora}`);
          return fechaA.getTime() - fechaB.getTime();
        });
      } else {
        this.mejoresJugadores = respuesta.sort((a: any, b: any) => {
          if (b.puntaje !== a.puntaje) {
            return b.puntaje - a.puntaje;
          }
          //Si el puntaje es igual, ordeno por fecha
          const fechaA = new Date(`${a.dia}T${a.hora}`);
          const fechaB = new Date(`${b.dia}T${b.hora}`);
          return fechaA.getTime() - fechaB.getTime();
        });
      }
    });
  }

  convertirTiempo (segundosAConvertir: number) {
    // Calculo los minutos
    const minutos = Math.floor(segundosAConvertir / 60);
    // Saco los segundos restantes
    const segundos = segundosAConvertir % 60;
  
    // Formateo segundos menores que 10
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;
    return `${minutos}:${segundosFormateados}`;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
