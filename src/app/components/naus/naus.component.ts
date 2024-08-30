import { Component, OnInit, signal } from '@angular/core';
import { ServeiNausService } from '../../sevices/servei.naus.service';
import { Nau } from '../../interfaces/nau';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-naus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './naus.component.html',
  styleUrls: ['./naus.component.scss']
})
export class NausComponent implements OnInit {
  naus = signal<Nau[]>([]);
  nauSeleccionada = signal<Nau | null>(null);
  nauImatgeUrl = signal<string | null>(null);

  constructor(private nausService: ServeiNausService) { }

  ngOnInit(): void {
    this.nausService.naus$.subscribe((data: Nau[]) => {
      this.naus.set(data);
    });
  }

  mostraDetallNau(nau: Nau): void {
    this.nauSeleccionada.set(nau);
    const nauId = nau.url.split('/').filter(Boolean).pop();
    this.nauImatgeUrl.set(`https://starwars-visualguide.com/assets/img/starships/${nauId}.jpg`);
  }

  loadMoreNaus(): void {
    this.nausService.getMoreNaus().subscribe();
  }
}
