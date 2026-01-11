import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { Client } from '../models/client.model';
import { GarageDataService } from '../services/garage-data.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.scss',
})
export class Vehicles {
  vehicles$!: Observable<Vehicle[]>;
  clients$!: Observable<Client[]>; 

  newVehicle: Omit<Vehicle, 'id'> = {
    clientId: 0,
    ownerFullName: '',
    category: '',
    make: '',
    model: '',
    firstRegistrationDate: '',
    carPlate: '',
    grossWeightKg: 0,
    seats: 0,
    usageType: '',
  };

  editingId: number | null = null;

  constructor(private dataService: GarageDataService) {
    this.vehicles$ = this.dataService.vehicles$;
    this.clients$ = this.dataService.clients$; 
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.editingId === null) {
      this.dataService.addVehicle(this.newVehicle);
    } else {
      this.dataService.updateVehicle(this.editingId, this.newVehicle);
    }

    this.resetForm(form);
  }

  startEdit(vehicle: Vehicle): void {
    this.editingId = vehicle.id;
    this.newVehicle = {
      clientId: vehicle.clientId,
      ownerFullName: vehicle.ownerFullName,
      category: vehicle.category,
      make: vehicle.make,
      model: vehicle.model,
      firstRegistrationDate: vehicle.firstRegistrationDate,
      carPlate: vehicle.carPlate,
      grossWeightKg: vehicle.grossWeightKg,
      seats: vehicle.seats,
      usageType: vehicle.usageType,
    };
  }

  removeVehicle(id: number): void {
    this.dataService.removeVehicle(id);
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  private resetForm(form: NgForm): void {
    this.editingId = null;
    this.newVehicle = {
      clientId: 0,
      ownerFullName: '',
      category: '',
      make: '',
      model: '',
      firstRegistrationDate: '',
      carPlate: '',
      grossWeightKg: 0,
      seats: 0,
      usageType: '',
    };
    form.resetForm();
  }
}
