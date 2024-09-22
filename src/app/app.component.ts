import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JuegosModule } from './modules/juegos/juegos.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JuegosModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp1-salajuegos';
}
