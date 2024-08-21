import { Component, OnInit, signal } from '@angular/core';
import { ServeiNausService } from '../../sevices/servei.naus.service';
import { Nau } from '../../interfaces/nau';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-naus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './naus.component.html',
  styleUrl: './naus.component.scss'
})
export class NausComponent implements OnInit {
  naus = signal<Nau[]>([]);

  constructor(private nausService: ServeiNausService) { }

  ngOnInit(): void {
    this.nausService.getNaus().subscribe((data: any) => {
      this.naus.set(data.results);
      console.log('Naus carregades:', this.naus());
    });
  }
  // getNaveSeleccionada(item: Nau) {
  //   // Lògica per manejar la nau seleccionada
  //   console.log(item);
  // }
}
