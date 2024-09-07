import { Component } from '@angular/core';
// Initialization for ES Users
import { Collapse, Ripple, initMDB } from 'mdb-ui-kit';

initMDB({ Collapse, Ripple });

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
