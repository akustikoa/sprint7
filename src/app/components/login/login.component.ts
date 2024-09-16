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
  errorMessage = '';  // Variable per emmagatzemar el missatge d'error

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

    // Recuperar la URL de redirecció, si n'hi ha
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'] || '/naus';
    });
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.http.post('http://localhost:3000/login', { email, password })
      .pipe(
        // Capturar l'error quan el login falla
        catchError(err => {
          // Si hi ha un error, mostrar el missatge d'error
          this.errorMessage = 'l\'email o la contrasenya són incorrectes';
          return of(null);  // Retornar observable buit per no trencar el flux
        })
      )
      .subscribe((response: any) => {
        if (response) {
          // Si el login és correcte, guarda el token i redirigeix
          this.authService.login(response.accessToken);
          this.router.navigateByUrl(this.redirectUrl!);
        }
      });
  }
}
