import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = signal<string | null>(null);

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  register() {
    const { email, password } = this.registerForm.value;

    // Verificar si l'email ja existeix
    this.http.get<any[]>(`http://localhost:3000/users?email=${email}`)
      .subscribe(users => {
        if (users.length > 0) {
          // Si l'usuari ja existeix, mostrar missatge d'error
          this.errorMessage.set('Aquest email ja està registrat.');
        } else {
          // Si no existeix, registrar l'usuari i iniciar sessió
          this.http.post('http://localhost:3000/register', { email, password })
            .subscribe((response: any) => {
              localStorage.setItem('token', response.accessToken);
              this.router.navigate(['/home']);
            });
        }
      });
  }
}