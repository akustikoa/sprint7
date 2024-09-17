import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ServeiAuthService } from '../../sevices/servei.auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = signal<string | null>(null);


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: ServeiAuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const { email, password } = this.registerForm.value;


    this.http.get<any[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        catchError(err => {
          this.errorMessage.set('Error de connexió. Torna-ho a intentar més tard.');
          return of([]);
        })
      )
      .subscribe(users => {
        if (users.length > 0) {
          this.errorMessage.set('Aquest email ja està registrat.');
        } else {

          this.http.post('http://localhost:3000/register', { email, password })
            .pipe(
              catchError(err => {
                this.errorMessage.set('Hi ha hagut un error durant el registre. Torna-ho a intentar.');
                return of(null);
              })
            )
            .subscribe((response: any) => {
              if (response && response.accessToken) {

                this.authService.login(response.accessToken);
                this.router.navigate(['/naus']);
              } else {
                this.errorMessage.set('Error en la resposta del servidor.');
              }
            });
        }
      });
  }
}
