import { Component, OnInit, signal } from '@angular/core';
import { ServeiNausService } from '../../sevices/servei.naus.service';
import { Nau } from '../../interfaces/nau';

@Component({
  selector: 'app-naus',
  standalone: true,
  imports: [],
  templateUrl: './naus.component.html',
  styleUrl: './naus.component.scss'
})
export class NausComponent implements OnInit {
  naus = signal<Nau[]>([]);

  constructor(private nausService: ServeiNausService) { }

  ngOnInit(): void {
    this.nausService.getNaus().subscribe((data: Nau[]) => {
      this.naus.set(data);
    });
  }
}
