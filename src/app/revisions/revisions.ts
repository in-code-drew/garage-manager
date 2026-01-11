import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Revision } from '../models/revision.model';
import { Vehicle } from '../models/vehicle.model';
import { GarageDataService } from '../services/garage-data.service';

@Component({
  selector: 'app-revisions',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './revisions.html',
  styleUrl: './revisions.scss',
})
export class Revisions {
  revisions$!: Observable<Revision[]>;
  vehicles$!: Observable<Vehicle[]>;

  selectedVehicleId = 0; // se poi vorrai filtrare

  newRevision: Omit<Revision, 'id'> = {
    vehicleId: 0,
    carPlate: '',
    date: '',
    centerName: '',
    centerType: 'officina',
    outcome: 'superata',
    notes: '',
    nextExpiryDate: '',
  };

  editingId: number | null = null;

  constructor(private dataService: GarageDataService) {
    this.vehicles$ = this.dataService.vehicles$;
    this.revisions$ = this.dataService.revisions$;
  }

  showForm = false;
  onAddRevision(form?: NgForm): void {
    this.showForm = true;
    this.editingId = null;
    this.newRevision = {
      vehicleId: 0,
      carPlate: '',
      date: '',
      centerName: '',
      centerType: 'officina',
      outcome: 'superata',
      notes: '',
      nextExpiryDate: '',
    };
    if (form) form.resetForm(this.newRevision);
  }

  formatDate(dateIso: string | null | undefined): string {
    if (!dateIso) return '';
    const [yyyy, mm, dd] = dateIso.split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

  isExpired(rev: Revision): boolean {
    if (!rev.nextExpiryDate) return false;
    const today = new Date().toISOString().slice(0, 10);
    return rev.nextExpiryDate < today;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.editingId === null) {
      this.dataService.addRevision(this.newRevision);
    } else {
      this.dataService.updateRevision(this.editingId, this.newRevision);
    }

    this.resetForm(form);
    this.showForm = false;
  }

  startEdit(rev: Revision): void {
    this.showForm = true;
    this.editingId = rev.id;
    this.newRevision = {
      vehicleId: rev.vehicleId,
      carPlate: rev.carPlate,
      date: rev.date,
      centerName: rev.centerName,
      centerType: rev.centerType,
      outcome: rev.outcome,
      notes: rev.notes ?? '',
      nextExpiryDate: rev.nextExpiryDate,
    };
  }

  deleteRevision(id: number): void {
    this.dataService.removeRevision(id);
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
    this.showForm = false;
  }

  private resetForm(form: NgForm): void {
    this.editingId = null;
    this.newRevision = {
      vehicleId: 0,
      carPlate: '',
      date: '',
      centerName: '',
      centerType: 'officina',
      outcome: 'superata',
      notes: '',
      nextExpiryDate: '',
    };
    form.resetForm(this.newRevision);
  }
}
