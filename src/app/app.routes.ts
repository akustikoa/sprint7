import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NausComponent } from './components/naus/naus.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // a home per defecte 
    { path: 'home', component: HomeComponent }, // ruta al component home
    { path: 'naus', component: NausComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
