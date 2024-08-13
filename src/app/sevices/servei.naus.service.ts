import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nau } from '../interfaces/nau';

@Injectable({
  providedIn: 'root'
})
export class ServeiNausService {
  private apiUrl = 'https://swapi.dev/api/starships';


  constructor(private http: HttpClient) { }

  getNaus(): Observable<Nau[]> {
    return this.http.get<Nau[]>(this.apiUrl);
  }
}
