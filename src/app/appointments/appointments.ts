import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Client } from '../models/client.model';
import { Vehicle } from '../models/vehicle.model';
import { GarageDataService } from '../services/garage-data.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
})
export class Appointments {
  appointments$!: Observable<Appointment[]>;
  clients$!: Observable<Client[]>;
  vehicles$!: Observable<Vehicle[]>;

  newAppointment: Omit<Appointment, 'id'> = {
    clientId: 0,
    ownerFullName: '',
    vehicleId: 0,
    date: '',
    hour: '',
    note: '',
  };

  editingId: number | null = null;

  constructor(private dataService: GarageDataService) {
    this.appointments$ = this.dataService.appointments$;
    this.clients$ = this.dataService.clients$;
    this.vehicles$ = this.dataService.vehicles$;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.editingId === null) {
      this.dataService.addAppointment(this.newAppointment);
    } else {
      this.dataService.updateAppointment(this.editingId, this.newAppointment);
    }

    this.resetForm(form);
  }

  startEdit(app: Appointment): void {
    this.editingId = app.id;
    this.newAppointment = {
      clientId: app.clientId,
      ownerFullName: app.ownerFullName,
      vehicleId: app.vehicleId,
      date: app.date,
      hour: app.hour,
      note: app.note ?? '',
    };
  }

  deleteAppointment(id: number): void {
    this.dataService.removeAppointment(id);
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  private resetForm(form: NgForm): void {
    this.editingId = null;
    this.newAppointment = {
      clientId: 0,
      ownerFullName: '',
      vehicleId: 0,
      date: '',
      hour: '',
      note: '',
    };
    form.resetForm();
  }
}
