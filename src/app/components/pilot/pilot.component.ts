import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [],
  templateUrl: './pilot.component.html',
  styleUrl: './pilot.component.scss'
})

export class PilotComponent implements OnInit {
  @Input() pilot: any;
  pilotImatgeUrl: string | null = null;

  ngOnInit() {
    const pilotId = this.pilot.url.split('/').filter(Boolean).pop();
    this.pilotImatgeUrl = `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;
  }
}
