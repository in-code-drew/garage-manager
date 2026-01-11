import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { GarageDataService } from '../services/garage-data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  totalClients$;
  totalVehicles$;
  totalAppointments$;
  upcomingAppointments$;

  constructor(private dataService: GarageDataService) {
    this.totalClients$ = this.dataService.clients$.pipe(
      map(clients => clients.length)
    );

    this.totalVehicles$ = this.dataService.vehicles$.pipe(
      map(vechiles => vechiles.length)
    );

    this.totalAppointments$ = this.dataService.appointments$.pipe(
      map(appointments => appointments.length)
    );

    this.upcomingAppointments$ = this.dataService.upcomingAppointments$;

  }
}


