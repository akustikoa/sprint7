import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ServeiNausService } from '../../sevices/servei.naus.service';
import { Nau } from '../../interfaces/nau';
import { CommonModule } from '@angular/common';
import { PilotComponent } from '../pilot/pilot.component';

@Component({
  selector: 'app-naus',
  standalone: true,
  imports: [CommonModule, PilotComponent],
  templateUrl: './naus.component.html',
  styleUrls: ['./naus.component.scss']
})
export class NausComponent implements OnInit {
  naus = signal<Nau[]>([]);
  nauSeleccionada = signal<Nau | null>(null);
  nauImatgeUrl = signal<string | null>(null);
  pilots = signal<any[]>([]); //signal per els pilots

  constructor(private nausService: ServeiNausService) { }

  ngOnInit(): void {
    this.nausService.naus$.subscribe((data: Nau[]) => {
      this.naus.set(data);
      console.log(this.naus());
    });
  }

  mostraDetallNau(nau: Nau): void {
    this.nauSeleccionada.set(nau);
    const nauId = nau.url.split('/').filter(Boolean).pop();
    this.nauImatgeUrl.set(`https://starwars-visualguide.com/assets/img/starships/${nauId}.jpg`);

    if (nau.pilots.length) { //nau.pilots && nau.pilots.length
      this.nausService.getPilots(nau.pilots).subscribe(pilots => {
        this.pilots.set(pilots); //actualitza signal amb els pilots
      });
    } else {
      this.pilots.set([]);
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

  @HostListener('window:scroll', ['$event']) // no em mostra el Hostlistener!!!!!!!!!!!!
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.carregaMesNaus();
    }
  }

  // Afegir la funció de fallback per carregar la imatge local si falla la imatge externa
  fallbackImage(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/starships/default.jpg';  // Imatge local per defecte
  }
}
