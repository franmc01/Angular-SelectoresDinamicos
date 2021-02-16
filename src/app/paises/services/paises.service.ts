import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.eu/rest/v2/region';


  get continentes(): string[] {
    return [...this._continentes]
  }

  constructor(private http: HttpClient) { }

  obtenerPaises(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.baseUrl}/${region}?fields=name;alpha3Code`)
  }
}
