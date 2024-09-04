
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServeiAuthService {
  // Signal per controlar si l'usuari està logat
  isLoggedIn = signal<boolean>(false);

  constructor() {
    // Comprovar si hi ha un token a localStorage en iniciar l'aplicació
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);  // Si hi ha un token, establim l'usuari com a logat
    }
  }

  // Mètode per gestionar l'inici de sessió
  login(token: string): void {
    localStorage.setItem('token', token);  // Desar el token a localStorage
    this.isLoggedIn.set(true);  // Actualitzar l'estat de login
  }

  // Mètode per gestionar el tancament de sessió
  logout(): void {
    localStorage.removeItem('token');  // Eliminar el token de localStorage
    this.isLoggedIn.set(false);  // Actualitzar l'estat de login a deslogat
  }

  // Mètode per comprovar si l'usuari està logat (retorna true o false)
  isAuthenticated(): boolean {
    return this.isLoggedIn();  // Retorna l'estat actual del signal
  }
}