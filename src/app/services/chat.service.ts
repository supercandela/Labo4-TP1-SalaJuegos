import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: Firestore,
  ) { }

  registrarMensaje(usuario: string, mensaje: string) {
    let col = collection(this.firestore, 'chat');
    addDoc(col, { fecha: new Date(), usuario: usuario, mensaje: mensaje });
  }

  getMensajes() {
    let col = collection(this.firestore, 'chat');
    const filteredQuery = query(col, orderBy('fecha', 'asc'));
    const observable = collectionData(filteredQuery);
    console.log(observable);
    return observable;

    // this.sub = observable.subscribe((respuesta: any) => {
    //   this.loginsCollection = respuesta;
    //   this.countLogins = this.loginsCollection.length;
    //   console.log(respuesta);
    // });
  }
}
