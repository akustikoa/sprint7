import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [],
  templateUrl: './pilot.component.html',
  styleUrl: './pilot.component.scss'
})
export class PilotComponent implements OnInit {
  @Input() pilot: any;  // rep la info del pilot 
  pilotImatgeUrl: string | null = null; // url imatge

  ngOnInit() {
    // afegim id pilot a la Url
    const pilotId = this.pilot.url.split('/').filter(Boolean).pop();
    this.pilotImatgeUrl = `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;
  }
}
