import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServeiAuthService } from '../../sevices/servei.auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  redirectUrl: string | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: ServeiAuthService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'] || '/naus';
    });
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.http.post('http://localhost:3000/login', { email, password })
      .pipe(
        catchError(err => {
          this.errorMessage = 'l\'email o la contrasenya són incorrectes';
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.authService.login(response.accessToken);
          this.router.navigateByUrl(this.redirectUrl!);
        }
      });
  }
}
