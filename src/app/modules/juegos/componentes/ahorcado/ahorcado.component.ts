import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  puntaje: number = 0;
  private usuarioMail: string = '';
  palabraAAdivinar: string = ''; // La palabra que hay que adivinar
  palabraMostrada: string = ''; // La palabra que se muestra con guiones
  errores: number = 0; // Numero de errores cometidos
  maxerrores: number = 6; // Máximo numero de errores permitidos
  alfabeto: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''); // Alfabeto
  letrasUsadas: string[] = []; // Letras que ya fueron seleccionadas

  palabras: string[] = [
    'cielo',
    'mariposa',
    'ventana',
    'camino',
    'espejo',
    'montaña',
    'manzana',
    'libro',
    'amigo',
    'esperanza',
    'noche',
    'fuego',
    'tierra',
    'sol',
    'agua',
    'perro',
    'gato',
    'ciudad',
    'bosque',
    'palabra',
    'sueño',
    'silencio',
    'corazon',
    'mundo',
    'felicidad',
    'sonrisa',
    'estrella',
    'lluvia',
    'fuerza',
    'luz',
    'arbol',
    'casa',
    'puente',
    'piedra',
    'flor',
    'rojo',
    'verde',
    'azul',
    'negro',
    'blanco',
    'dulce',
    'fuerte',
    'grande',
    'pequeño',
    'alto',
    'largo',
    'ancho',
    'recto',
    'redondo',
    'claro',
    'oscuro',
    'nuevo',
    'viejo',
    'frio',
    'caliente',
    'tibio',
    'suave',
    'duro',
    'feliz',
    'triste',
    'rapido',
    'lento',
    'peligroso',
    'seguro',
    'sabio',
    'tonto',
    'fresco',
    'serio',
    'vivo',
    'muerto',
    'lento',
    'ligero',
    'fino',
    'grueso',
    'firme',
    'blando',
    'libre',
    'atado',
    'joven',
    'anciano',
    'dorado',
    'plateado',
    'brillante',
    'oscuro',
    'limpio',
    'sucio',
    'lleno',
    'vacio',
    'seco',
    'mojado',
    'rico',
    'pobre',
    'honesto',
    'mentiroso',
    'valiente',
    'miedoso',
    'justo',
    'injusto',
    'sabroso',
    'desagradable',
    'amargo',
    'picante',
    'alegre',
    'enojado',
    'enfermo',
    'sano',
    'hermoso',
    'feo',
    'caro',
    'barato',
    'famoso',
    'desconocido',
    'pesado',
    'ligero',
    'facil',
    'dificil',
    'amable',
    'cruel',
    'gracioso',
    'serio',
    'tranquilo',
    'ruidoso',
    'comodo',
    'incomodo',
    'corto',
    'largo',
    'delgado',
    'gordo',
    'estrecho',
    'ancho',
    'profundo',
    'superficial',
    'antiguo',
    'moderno',
    'fragil',
    'resistente',
    'frontal',
    'trasero',
    'proximo',
    'lejano',
    'abierto',
    'cerrado',
    'facil',
    'dificil',
    'importante',
    'insignificante',
    'perfecto',
    'imperfecto',
    'recto',
    'curvado',
    'redondo',
    'cuadrado',
    'triangular',
    'sincero',
    'hipocrita',
    'orgulloso',
    'humilde',
    'valioso',
    'insignificante',
    'contento',
    'disgustado',
    'maduro',
    'inmaduro',
    'lento',
    'veloz',
    'constante',
    'variable',
    'necesario',
    'innecesario',
    'fuerte',
    'debil',
    'alegre',
    'triste',
    'esperanzado',
    'desesperado',
    'optimista',
    'pesimista',
    'preciso',
    'vago',
    'concreto',
    'abstracto',
    'real',
    'irreal',
    'facil',
    'complicado',
    'amplio',
    'estrecho',
    'comodo',
    'incomodo',
    'firme',
    'flexible',
    'despacio',
    'deprisa',
    'seguro',
    'inseguro',
    'util',
    'inutil',
    'agradable',
    'desagradable',
    'bonito',
    'feo',
    'inteligente',
    'ignorante',
    'atento',
    'distraido',
    'complicado',
    'sencillo',
    'amplio',
    'reducido',
    'conocido',
    'desconocido',
    'barato',
    'caro',
    'normal',
    'extraño',
    'habitual',
    'infrecuente',
    'duro',
    'blando',
    'flexible',
    'rigido',
    'agradable',
    'molesto',
    'importante',
    'trivial',
    'necesario',
    'prescindible',
    'peligroso',
    'seguro',
    'activo',
    'pasivo',
    'creativo',
    'monotono',
    'logico',
    'irracional',
    'feliz',
    'desgraciado',
    'brillante',
    'opaco',
    'rico',
    'pobre',
    'optimista',
    'pesimista',
    'progresivo',
    'regresivo',
    'alegre',
    'melancolico',
    'duro',
    'suave',
    'tranquilo',
    'nervioso',
    'paciente',
    'impaciente',
    'veloz',
    'lento',
    'atento',
    'distraido',
    'clasico',
    'moderno',
    'aburrido',
    'emocionante',
    'positivo',
    'negativo',
    'puntual',
    'tardio',
    'brusco',
    'suave',
    'luminoso',
    'oscuro',
    'energico',
    'agotado',
    'lucido',
    'confuso',
    'sabroso',
    'insipido',
    'amargo',
    'dulce',
    'claro',
    'turbio',
    'entusiasmado',
    'indiferente',
    'calmado',
    'alterado',
    'capaz',
    'inutil',
    'ligero',
    'pesado',
    'distante',
    'cercano',
    'seco',
    'humedo',
    'fresco',
    'caliente',
    'frio',
    'tibio',
    'mojado',
    'seco',
    'ligero',
    'fuerte',
    'tierno',
    'tosco',
    'rapido',
    'lento',
    'horrible',
    'maravilloso',
    'bello',
    'feo',
    'normal',
    'extraordinario',
    'extraño',
    'corriente',
    'cansado',
    'descansado',
    'silencioso',
    'bullicioso',
    'ruidoso',
    'callado',
    'oscuro',
    'luminoso',
    'sereno',
    'tormentoso',
    'tranquilo',
    'alterado',
    'vivo',
    'muerto',
    'sano',
    'enfermo',
    'saludable',
    'malo',
    'bueno',
    'perfecto',
    'defectuoso',
    'limpio',
    'sucio',
    'ordenado',
    'desordenado',
    'hermoso',
    'feo',
    'apasionado',
    'indiferente',
    'ardiente',
    'frio',
    'valiente',
    'cobarde',
    'amable',
    'descortes',
    'sociable',
    'timido',
    'prudente',
    'temerario',
    'sabio',
    'ignorante',
    'alegre',
    'triste',
    'inteligente',
    'tonto',
    'habil',
    'torpe',
    'serio',
    'gracioso',
    'maduro',
    'infantil',
    'generoso',
    'tacaño',
    'humilde',
    'orgulloso',
    'simpatico',
    'antipatico',
    'optimista',
    'pesimista',
    'nervioso',
    'tranquilo',
    'decidido',
    'indeciso',
    'detallista',
    'despreocupado',
    'metodico',
    'improvisador',
    'educado',
    'maleducado',
    'honesto',
    'mentiroso',
    'justo',
    'injusto',
    'pacifico',
    'agresivo',
    'solidario',
    'egoista',
    'tolerante',
    'intolerante',
    'coherente',
    'incoherente',
    'constante',
    'inconstante',
    'valiente',
    'miedoso',
    'prudente',
    'temerario',
    'educado',
    'grosero',
    'tranquilo',
    'nervioso',
    'alegre',
    'melancolico',
    'cordial',
    'frio',
    'positivo',
    'negativo',
    'creativo',
    'conformista',
    'entusiasta',
    'apatico',
    'amable',
    'descortes',
    'ingenioso',
    'aburrido',
    'discreto',
    'indiscreto',
    'abierto',
    'cerrado',
    'fresco',
    'agotado',
    'sano',
    'enfermo',
    'valiente',
    'cobarde',
    'diligente',
    'perezoso',
    'curioso',
  ];

  imagenesAhorcado: string[] = [
    '../../../../../assets/ahorcado-0.png', // Imagen inicial sin errores
    '../../../../../assets/ahorcado-1.png', // Imagen con 1 error
    '../../../../../assets/ahorcado-2.png', // Imagen con 2 errores
    '../../../../../assets/ahorcado-3.png', // Imagen con 3 errores
    '../../../../../assets/ahorcado-4.png', // Imagen con 4 errores
    '../../../../../assets/ahorcado-5.png', // Imagen con 5 errores
    '../../../../../assets/ahorcado-7.png', // Imagen final, ahorcado completo
  ];

  imagenAhorcadoAMostrar: string = this.imagenesAhorcado[0]; // Imagen actual del ahorcado

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.reiniciarPartida();
  }

  obtenerPalabra(): string {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[randomIndex];
  }

  // Inicializa el juego
  reiniciarPartida() {
    this.palabraAAdivinar = this.obtenerPalabra(); // Selecciona una palabra aleatoria
    this.errores = 0;
    this.puntaje = 0;
    this.imagenAhorcadoAMostrar = this.imagenesAhorcado[0];
    this.letrasUsadas = [];
    this.palabraMostrada = this.palabraAAdivinar.replace(/./g, '_');
  }

  // Método para manejar el intento del jugador
  arriesgarLetra(letra: string) {
    this.letrasUsadas.push(letra); // Marcar la letra como usada

    if (this.palabraAAdivinar.toUpperCase().includes(letra)) {
      let updatedWord = '';
      for (let i = 0; i < this.palabraAAdivinar.length; i++) {
        if (this.palabraAAdivinar[i].toUpperCase() === letra) {
          //Sumar puntos por letra adivinada
          let puntosPorLetraAdivinada = 20 / this.palabraAAdivinar.length;
          this.puntaje += parseFloat(puntosPorLetraAdivinada.toFixed(2));
          updatedWord += this.palabraAAdivinar[i];
        } else {
          updatedWord += this.palabraMostrada[i];
        }
      }
      this.palabraMostrada = updatedWord.toUpperCase();
    } else {
      this.errores++;
      this.imagenAhorcadoAMostrar = this.imagenesAhorcado[this.errores]; // Actualiza la imagen del ahorcado
    }

    // Chequear si el jugador ha perdido
    if (this.errores >= this.maxerrores) {
      Swal.fire({
        icon: 'error',
        title: '¡Perdiste!',
        text: 'La palabra era: ' + this.palabraAAdivinar,
      });
    }

    // Cuando el jugador gana
    if (this.palabraMostrada == this.palabraAAdivinar.toUpperCase()) {
      for (let i = 0; i < this.alfabeto.length; i++) {
        this.letrasUsadas.push(this.alfabeto[i]);
      }
      //Sumar puntos al adivinar la palabra
      let puntajeFinal =
        this.puntaje * (this.puntaje / this.palabraAAdivinar.length);
      let puntajeRedondeado = puntajeFinal.toFixed(2);
      this.puntaje = parseFloat(puntajeRedondeado);
      Swal.fire({
        icon: 'success',
        title: '¡Ganaste!',
        text: 'Adivinaste la palabra correctamente.',
      });
      this.registrarPuntaje();
    }
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

    let col = collection(this.firestore, 'topAhorcado');
    addDoc(col, {
      usuario: this.usuarioMail,
      puntaje: this.puntaje,
      dia: dia,
      hora: hora,
    });
  }
}
