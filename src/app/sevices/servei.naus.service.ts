import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Nau } from '../interfaces/nau';

@Injectable({
  providedIn: 'root'
})
export class ServeiNausService {
  private apiUrl = 'https://swapi.py4e.com/api/starships';
  private nextUrl: string | null = this.apiUrl;
  private nausSubject = new BehaviorSubject<Nau[]>([]);
  public naus$ = this.nausSubject.asObservable();
  public viewMoreNaus = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.getNaus();
  }

  private getNaus(): void {
    this.http.get<{ results: Nau[], next: string | null }>(this.apiUrl).pipe(
      tap(response => {
        this.nextUrl = response.next;
        this.viewMoreNaus.next(!!this.nextUrl);
        this.nausSubject.next(response.results);
      })
    ).subscribe();
  }

  public getMoreNaus(): Observable<Nau[]> {
    if (!this.nextUrl) {
      this.viewMoreNaus.next(false);
      return new Observable<Nau[]>();
    }

    return this.http.get<{ results: Nau[], next: string | null }>(this.nextUrl).pipe(
      tap(response => {
        this.nextUrl = response.next;
        this.viewMoreNaus.next(!!this.nextUrl);
        const currentNaus = this.nausSubject.value;
        this.nausSubject.next([...currentNaus, ...response.results]);
      }),
      map(response => response.results)
    );
  }

  public getPilots(pilotUrls: string[]): Observable<any[]> {
    if (!pilotUrls.length) return new Observable<any[]>();
    const pilotRequests = pilotUrls.map(url => this.http.get(url));
    return forkJoin(pilotRequests);
  }

  public getFilms(filmUrls: string[]): Observable<any[]> {
    if (!filmUrls.length) return new Observable<any[]>();
    const filmRequests = filmUrls.map(url => this.http.get(url));
    return forkJoin(filmRequests);
  }

}
