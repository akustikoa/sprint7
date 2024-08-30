import { HttpClient } from '@angular/common/http'; //per fer peticions http get, post, etc.
import { Injectable } from '@angular/core'; //marca una calsse com a servei 
import { Observable } from 'rxjs'; // permet gestionar dades asíncrones com les dades que arriben de la petició http 
import { map } from 'rxjs/operators'; // permet transofrmar i extreure les dades que arriben de l'observable 
import { Nau } from '../interfaces/nau'; // interfície

@Injectable({
  providedIn: 'root'
})
export class ServeiNausService {
  private apiUrl = 'https://swapi.dev/api/starships'; // si és privada només s'utilitza en aquesta classe

  constructor(private http: HttpClient) { } // permet fer peticions http dins de la classe 

  getNaus(): Observable<Nau[]> {
    return this.http.get<{ results: Nau[] }>(this.apiUrl).pipe(
      map(response => response.results) // Amb map treiem de la resposta de l'api (reponse) només l'array de naus 
    );
  }
}