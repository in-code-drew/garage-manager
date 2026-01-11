import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'; // combined streams
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { EMAIL_REGEX, PHONE_REGEX } from '../shared/validators/regex';
import { trim } from '../shared/validators/normalizer';
import { Client } from '../models/client.model';
import { GarageDataService } from '../services/garage-data.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})

export class Clients {
  // all clients unfiltered stream
  clients$!: Observable<Client[]>;

  // filtered stream by search
  filteredClients$!: Observable<Client[]>;

  private searchSubject = new BehaviorSubject<string>('');

  // form model for client creation/modify
  newClient: Omit<Client, 'id'> = {
    fullName: '',
    phone: '',
    email: '',
  };

  // while editing id is gonna be null (creating mode)
  editingId: number | null = null;

  // REGEX
  emailRegex = EMAIL_REGEX;
  phoneRegex = PHONE_REGEX;


  // DI of service
  constructor(private dataService: GarageDataService) {

    // service stream link with component stream
    this.clients$ = this.dataService.clients$;

    // combined stream: clients list & searched text
    this.filteredClients$ =
      combineLatest([this.clients$, this.searchSubject]).pipe(
      map(([clients, term]) => {
        const t = term.trim().toLowerCase();

        // if there's no client research, show all clients
        if (!t) return clients;

        // search by name or id
        return clients.filter(c =>
          c.fullName.toLowerCase().includes(t) || String(c.id).includes(t));
          })
        );
      }

  // update search stream value
  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  onSubmit(form: NgForm): void {
    // guard close: if form is not valid, exits instantly
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const payload: Omit<Client, 'id'> = {
    fullName: trim(this.newClient.fullName),
    email: trim(this.newClient.email),
    phone: trim(this.newClient.phone),
  };

    // if not in edit mode, add client
    if (this.editingId === null) {
      this.dataService.addClient(payload);
    } else {
      // otherwise update
      this.dataService.updateClient(this.editingId, payload);
    }

    // NOTE: no need to reload clients$, stream auto-updates
    this.resetForm(form);
  }


  startEdit(client: Client): void {
    this.editingId = client.id;
    this.newClient = {
      // copy&paste of data in the form
      fullName: client.fullName,
      phone: client.phone,
      email: client.email,
    };
  }

  removeClient(id: number): void {
    this.dataService.removeClient(id);
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  private resetForm(form: NgForm): void {
    this.editingId = null;
    this.newClient = { fullName: '', phone: '', email: '' };
    form.resetForm();
  }
}
