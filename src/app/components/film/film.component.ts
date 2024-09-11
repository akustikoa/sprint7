import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent implements OnInit {
  @Input() film: any;
  filmImatgeUrl: string | null = null;

  ngOnInit() {
    const filmId = this.film.url.split('/').filter(Boolean).pop();
    this.filmImatgeUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;
  }
}