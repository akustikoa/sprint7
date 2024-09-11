import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServeiAuthService } from '../../sevices/servei.auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: ServeiAuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}