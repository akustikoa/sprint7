import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Nau } from '../interfaces/nau';

@Injectable({
  providedIn: 'root'
})
export class ServeiNausService {
  private apiUrl = 'https://swapi.dev/api/starships';
  private nextUrl: string | null = this.apiUrl;
  private nausSubject = new BehaviorSubject<Nau[]>([]);
  public naus$ = this.nausSubject.asObservable();

  constructor(private http: HttpClient) { }

  getFirstPage(): void {
    this.http.get<{ results: Nau[], next: string | null }>(this.apiUrl).pipe(
      tap(response => {
        this.nextUrl = response.next; // Actualitzem l'URL de la següent pàgina
        this.nausSubject.next(response.results); // Carreguem la primera pàgina al subjecte
      })
    ).subscribe();
  }

  getNaus(): Observable<Nau[]> {
    if (!this.nextUrl) return of([]); // Si no hi ha més pàgines, retornem un array buit

    return this.http.get<{ results: Nau[], next: string | null }>(this.nextUrl).pipe(
      tap(response => {
        this.nextUrl = response.next; // Actualitzem l'URL de la següent pàgina
        const currentNaus = this.nausSubject.value;
        this.nausSubject.next([...currentNaus, ...response.results]); // Afegim les noves naus a les existents
      }),
      map(response => response.results)
    );
  }
}
