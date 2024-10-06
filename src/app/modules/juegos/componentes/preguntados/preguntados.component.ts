import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MarvelService } from '../../../../services/marvel.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';

interface MarvelCharacter {
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent implements OnInit {
  currentQuestion: string = '';
  options: string[] = [];
  feedbackMessage: string = '';
  isCorrect: boolean = false;
  isAnswered: boolean = false;
  subPersonajes?: Subscription;
  randomCharacter?: MarvelCharacter;
  characterImageUrl: string = '';
  vidas: number = 5;
  puntaje: number = 0;
  private usuarioMail: string = '';

  constructor(
    private marvelService: MarvelService,
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    this.subPersonajes = this.marvelService.getData().subscribe((data: any) => {
      let characters: MarvelCharacter[] = data.data.results;
      // Filtrar personajes sin imagen
      characters = characters.filter(
        (character: MarvelCharacter) =>
          !character.thumbnail.path.endsWith('image_not_available')
      );
      // Si no hay personajes con imagen en el conjunto actual, cargar nuevamente
      if (characters.length < 4) {
        this.loadQuestion();
        return;
      }
      console.log(characters);
      this.randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];
      console.log(this.randomCharacter);
      // Configura la pregunta y opciones
      this.currentQuestion = `¿Cuál es el nombre de este personaje de Marvel?`;
      this.characterImageUrl = `${this.randomCharacter.thumbnail.path}.${this.randomCharacter.thumbnail.extension}`;
      this.options = this.generateOptions(
        this.randomCharacter.name,
        characters
      );
    });
  }

  generateOptions(correctAnswer: string, characters: any[]): string[] {
    const options = new Set<string>();
    options.add(correctAnswer);

    // Agrega opciones incorrectas aleatorias
    while (options.size < 4) {
      const randomOption =
        characters[Math.floor(Math.random() * characters.length)].name;
      options.add(randomOption);
    }

    // Baraja las opciones
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  checkAnswer(option: string) {
    // Deshabilitar todos los botones de respuesta
    this.isAnswered = true;

    if (option === this.randomCharacter?.name) {
      this.isCorrect = true;
      this.feedbackMessage = '¡Correcto!';
      this.puntaje += 10;
    } else {
      this.isCorrect = false;
      this.feedbackMessage = `Incorrecto, la respuesta correcta era: ${this.randomCharacter?.name}`;
      this.vidas -= 1;
    }

    // Si el jugador se queda sin vidas, termina el juego
    if (this.vidas === 0) {
      this.feedbackMessage = `Incorrecto, la respuesta correcta era: ${this.randomCharacter?.name}. ¡Se acabaron tus vidas! Juego terminado.`;
      this.registrarPuntaje();
    }
  }

  nextQuestion() {
    this.isAnswered = false;
    this.feedbackMessage = '';
    this.loadQuestion();
  }

  resetGame() {
    this.vidas = 5;
    this.puntaje = 0;
    this.feedbackMessage = '';
    this.nextQuestion();
  }

  registrarPuntaje() {
    // quién jugó
    this.usuarioMail = this.authService.getUsuario();
    const fechaActual = new Date();
    // en qué día
    const dia = fechaActual.toISOString().split('T')[0];
    // en qué hora
    const hora = fechaActual.toTimeString().split(' ')[0];
    // qué puntaje obtuvo -> this.tiempo

    let col = collection(this.firestore, 'topPreguntados');
    addDoc(col, {
      usuario: this.usuarioMail,
      puntaje: this.puntaje,
      dia: dia,
      hora: hora,
    });
  }

  ngOnDestroy() {
    this.subPersonajes?.unsubscribe();
  }
}
