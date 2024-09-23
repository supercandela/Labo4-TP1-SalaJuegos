import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked  {
  sub?: Subscription;
  nuevoMensaje: string = '';
  usuario: string = '';
  mensajes: any[] = [];
  @ViewChild('scrollAnchor') private scrollAnchor?: ElementRef;

  constructor (
    private authService: AuthService,
    private chatService: ChatService,
  ) {

  }

  ngOnInit () {
    this.usuario = this.authService.getUsuario();
    this.sub = this.chatService.getMensajes().subscribe((respuesta: any) => {
      this.mensajes = respuesta;
    });
  }

  enviarMensaje () {
    if (this.nuevoMensaje.trim() != '') {
      this.chatService.registrarMensaje(this.usuario, this.nuevoMensaje);
      this.nuevoMensaje = '';
      this.scrollToBottom();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
