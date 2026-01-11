import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Clients } from './clients/clients';
import { Vehicles } from './vehicles/vehicles';
import { Revisions } from './revisions/revisions';
import { Appointments } from './appointments/appointments';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'clients', component: Clients },
  { path: 'vehicles', component: Vehicles },
  { path: 'revisions', component: Revisions },
  { path: 'appointments', component: Appointments },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
