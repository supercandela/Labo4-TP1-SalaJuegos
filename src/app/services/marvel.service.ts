import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private_key = '97e8145a044878a79968eb8856726b888cbf0bff';
  public_key = '4eec2b3498a6e9877fa376037e853233';
  baseUrl = 'https://gateway.marvel.com/v1/public/characters';

  constructor(private http: HttpClient) {}

  getData() {
    // Llamada a la API de Marvel
    const timestamp = new Date().getTime().toString();
    const hash = crypto
      .MD5(timestamp + this.private_key + this.public_key)
      .toString();
    const offset = Math.floor(Math.random() * 1000); // Número aleatorio para variar el offset, que es desde donde empieza a traer personajes
    const url = `${this.baseUrl}?ts=${timestamp}&apikey=${this.public_key}&hash=${hash}&limit=10&offset=${offset}`;
    return this.http.get<any>(url);
  }
}
