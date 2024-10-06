import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-resultados',
  templateUrl: './top-resultados.component.html',
  styleUrl: './top-resultados.component.css'
})
export class TopResultadosComponent implements OnInit {
  juegoId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro 'juegoId' de la URL
    this.juegoId = this.route.snapshot.paramMap.get('juegoId') || '';
    this.cargarPuntajes(this.juegoId);
  }

  cargarPuntajes(juegoId: string): void {
    // Aquí iría la lógica para cargar los mejores puntajes del juego usando el juegoId
    console.log('Cargando puntajes del juego:', juegoId);
  }
}
