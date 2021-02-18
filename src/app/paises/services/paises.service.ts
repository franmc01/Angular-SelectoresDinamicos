import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, BigPais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.eu/rest/v2';


  get continentes(): string[] {
    return [...this._continentes]
  }

  constructor(private http: HttpClient) { }

  obtenerPaises(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.baseUrl}/region/${region}?fields=name;alpha3Code`)
  }

  obtenerPaisesPorCode(code: string): Observable<BigPais | null> {
    if (!code) {
      return of(null);
    }
    return this.http.get<BigPais>(`${this.baseUrl}/alpha/${code}`);
  }

  getPaisPorCodigoSmall( codigo: string ): Observable<Pais> {
    const url = `${ this.baseUrl }/alpha/${ codigo }?fields=alpha3Code;name`;
    return this.http.get<Pais>( url );
  }

  getPaisesPorCodigosFronteras(borders: string[]) {
    if (!borders) {
      return of([])
    }
    const peticiones: Observable<Pais>[] = [];
    borders.forEach(code => {
      const peticion = this.getPaisPorCodigoSmall(code);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
