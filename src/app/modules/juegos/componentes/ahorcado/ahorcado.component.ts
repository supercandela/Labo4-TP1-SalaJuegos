import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  puntaje: number = 0;

  secretWord: string = 'angular'; // La palabra que hay que adivinar
  displayedWord: string = ''; // La palabra que se muestra con guiones
  mistakes: number = 0; // Número de errores cometidos
  maxMistakes: number = 6; // Máximo número de errores permitidos
  alphabet: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''); // Alfabeto
  usedLetters: string[] = []; // Letras que ya fueron seleccionadas

  hangmanImages: string[] = [
    '../../../../../assets/ahorcado-0.png', // Imagen inicial sin errores
    '../../../../../assets/ahorcado-1.png', // Imagen con 1 error
    '../../../../../assets/ahorcado-2.png', // Imagen con 2 errores
    '../../../../../assets/ahorcado-3.png', // Imagen con 3 errores
    '../../../../../assets/ahorcado-4.png', // Imagen con 4 errores
    '../../../../../assets/ahorcado-5.png', // Imagen con 5 errores
    '../../../../../assets/ahorcado-7.png',  // Imagen final, ahorcado completo
  ];

  hangmanImage: string = this.hangmanImages[0]; // Imagen actual del ahorcado

  constructor() {
    this.resetGame();
  }

  // Inicializa el juego
  resetGame() {
    this.mistakes = 0;
    this.hangmanImage = this.hangmanImages[0];
    this.usedLetters = [];
    this.displayedWord = this.secretWord.replace(/./g, '_');
  }

 // Método para manejar el intento del jugador
 guessLetter(letter: string) {
  this.usedLetters.push(letter); // Marcar la letra como usada

  if (this.secretWord.toUpperCase().includes(letter)) {
    let updatedWord = '';
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i].toUpperCase() === letter) {
        updatedWord += this.secretWord[i];
      } else {
        updatedWord += this.displayedWord[i];
      }
    }
    this.displayedWord = updatedWord;
  } else {
    this.mistakes++;
    this.hangmanImage = this.hangmanImages[this.mistakes]; // Actualiza la imagen del ahorcado
  }

  // Chequear si el jugador ha perdido
  if (this.mistakes >= this.maxMistakes) {
    alert('¡Perdiste! La palabra era: ' + this.secretWord);
  }
}
}