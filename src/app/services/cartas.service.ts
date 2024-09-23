import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(
    private http: HttpClient
  ) { }

  getMazoId () {
    return this.http.get<any>('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  }

  getCartas (idMazo: string) {
    return this.http.get<any[]>(`https://www.deckofcardsapi.com/api/deck/${idMazo}/draw/?count=1`);
  }

  mezclarCartas (idMazo: string) {
    return this.http.get<any[]>(`https://www.deckofcardsapi.com/api/deck/${idMazo}/shuffle/`);
  }
}
