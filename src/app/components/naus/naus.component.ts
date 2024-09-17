import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ServeiNausService } from '../../sevices/servei.naus.service';
import { Nau } from '../../interfaces/nau';
import { CommonModule } from '@angular/common';
import { PilotComponent } from '../pilot/pilot.component';
import { FilmComponent } from '../film/film.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naus',
  standalone: true,
  imports: [CommonModule, PilotComponent, FilmComponent],
  templateUrl: './naus.component.html',
  styleUrls: ['./naus.component.scss']
})

export class NausComponent implements OnInit {
  naus = signal<Nau[]>([]);
  nauSeleccionada = signal<Nau | null>(null);
  nauImatgeUrl = signal<string | null>(null);
  pilots = signal<any[]>([]);
  films = signal<any[]>([]);
  viewMoreNaus = signal<boolean>(true);

  constructor(
    private nausService: ServeiNausService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.router.url === '/naus') {
        this.resetNauDetalls();
      }
    });

    this.nausService.naus$.subscribe((data: Nau[]) => {
      this.naus.set(data);
    });

    this.nausService.viewMoreNaus.subscribe((viewMore: boolean) => {
      this.viewMoreNaus.set(viewMore);
    });
  }

  mostraDetallNau(nau: Nau): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.nauSeleccionada.set(nau);
    const nauId = nau.url.split('/').filter(Boolean).pop();
    this.nauImatgeUrl.set(`https://starwars-visualguide.com/assets/img/starships/${nauId}.jpg`);

    if (nau.pilots.length) {
      this.nausService.getPilots(nau.pilots).subscribe(pilots => {
        this.pilots.set(pilots);
      });
    } else {
      this.pilots.set([]);
    }

    if (nau.films.length) {
      this.nausService.getFilms(nau.films).subscribe(films => {
        this.films.set(films);
      });
    } else {
      this.films.set([]);
    }
  }

  tornarLlistaNaus(): void {
    this.nauSeleccionada.set(null);
    this.nauImatgeUrl.set(null);
    this.pilots.set([]);
  }

  carregaMesNaus(): void {
    this.nausService.getMoreNaus().subscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.carregaMesNaus();
    }
  }

  fallbackImage(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/starships/default.jpg';
  }

  resetNauDetalls(): void {
    this.nauSeleccionada.set(null);
    this.nauImatgeUrl.set(null);
    this.pilots.set([]);
    this.films.set([]);
  }
}