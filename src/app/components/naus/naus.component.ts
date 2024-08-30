import { Component, OnInit, signal } from '@angular/core'; //signal variable reactives 
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
  naus = signal<Nau[]>([]); //guardem llista de naus recuperada de l'API, inicialment està buit
  nauSeleccionada = signal<Nau | null>(null); //guardem la nau seleccionada per l'usuari. Iniciem com null
  nauImatgeUrl = signal<string | null>(null); //guardem al Url de la nau seleccionada. Iniciem com null

  constructor(private nausService: ServeiNausService) { } // injectem el servei per utilitzar-lo

  ngOnInit(): void { // S'executa quan el component s'inicialitza. Obté les naus i quan es carreguen s'assignen al signal "naus"
    this.nausService.getNaus().subscribe((data: Nau[]) => {//rebem les dades de l'observable a data
      this.naus.set(data); // Assignem les dades obtingudes a data al signal naus amb el mètode set() això actualitza el signal
      console.log('Naus carregades:', this.naus());
    });
  }

  mostraDetallNau(nau: Nau): void {//El mètode rebrà l'objecte Nau
    this.nauSeleccionada.set(nau);
    const nauId = nau.url.split('/').filter(Boolean).pop();//dividim, filtrem cadenes buides i agafem l'última
    this.nauImatgeUrl.set(`https://starwars-visualguide.com/assets/img/starships/${nauId}.jpg`);
  }
}
