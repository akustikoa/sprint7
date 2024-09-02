import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NausComponent } from './components/naus/naus.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // a home per defecte 
    { path: 'home', component: HomeComponent }, // ruta al component home
    { path: 'naus', component: NausComponent },
];
