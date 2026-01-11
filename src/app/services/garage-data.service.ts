import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { Vehicle} from '../models/vehicle.model';
import { Revision } from '../models/revision.model';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class GarageDataService {

    // CLIENTS (state + stream)

    private clientsSubject = new BehaviorSubject<Client[]>([
        { id: 1, fullName: 'Luigi Verdi', phone: '3331234567', email: 'luigiverdi@example.com'},

        { id: 2, fullName: 'Mario Rossi', phone: '3337654321', email: 'mariorossi@example.com'},
    ]);

    // asObservable() -> who runs the service cannot use .next()
    clients$ = this.clientsSubject.asObservable();

    // Omit<Client, 'id'> -> auto generates ID
    addClient(data: Omit<Client, 'id'>): void {

        // .value -> current value of BehaviorSubject (synchronous)
        const current = this.clientsSubject.value;

        // if there's no elements assign id 1, otherwise max id + 1
        const newId = current.length ? Math.max(...current.map(c => c.id)) + 1 : 1;

        // emits new array, UI update
        this.clientsSubject.next([...current, { id: newId, ...data }]);
    }

    // remove client filtering on the list with the ones with different id than the one selected
    removeClient(id: number): void {
        this.clientsSubject.next(this.clientsSubject.value.filter(c => c.id !== id));
    }


    // NOTE: this replaces the whole Client with { id, ...data }
    updateClient(id:number, data:Omit<Client, 'id'>): void {
                this.clientsSubject.next(
                this.clientsSubject.value.map(c => (c.id === id ? { id, ...data } : c
                )
            )
        )
    }


    // VEHICLES SERVICES
    private vehiclesSubject = new BehaviorSubject<Vehicle[]>([

        { id: 1, clientId: 1, ownerFullName: 'Luigi Verdi', category: 'M1', make: 'Lancia', model: 'Ypsilon', firstRegistrationDate: '2021', carPlate: 'GN813GP', grossWeightKg: 1350, seats: 5, usageType: 'privato' },
        { id: 2, clientId: 2, ownerFullName: 'Mario Rossi', category: 'M1', make: 'Volkswagen', model: 'T-Roc', firstRegistrationDate: '2022', carPlate: 'GL004EM', grossWeightKg: 1550, seats: 5, usageType: 'privato' },
    ]);
    vehicles$ = this.vehiclesSubject.asObservable();

    addVehicle(data: Omit<Vehicle, 'id'>) {
        const current = this.vehiclesSubject.value;
        const newId = current.length ? Math.max(...current.map(v => v.id)) + 1 : 1;
        this.vehiclesSubject.next([...current, { id: newId, ...data }]);
    }

    removeVehicle(id: number) {
        this.vehiclesSubject.next(this.vehiclesSubject.value.filter(v => v.id !== id));
    }

    updateVehicle(id: number, data: Omit<Vehicle, 'id'>) {
        this.vehiclesSubject.next(
        this.vehiclesSubject.value.map(v => (v.id === id ? { id, ...data } : v))
        );
    }


    // Revisions

    private revisionsSubject = new BehaviorSubject<Revision[]>([
    {
        id: 1,
        vehicleId: 1,
        carPlate: 'GN813GP',
        date: '2024-05-10',
        centerName: 'Officina Rossi',
        centerType: 'officina',
        outcome: 'superata',
        notes: 'Prima revisione effettuata',
        nextExpiryDate: '2026-05-10',
    },
    {
        id: 2,
        vehicleId: 2,
        carPlate: 'GL004EM',
        date: '2023-11-02',
        centerName: 'Centro Revisioni Milano',
        centerType: 'motorizzazione',
        outcome: 'superata',
        notes: '',
        nextExpiryDate: '2025-11-02',
    },
    ]);

    revisions$ = this.revisionsSubject.asObservable();

    addRevision(data: Omit<Revision, 'id'>): void {
    const current = this.revisionsSubject.value;
    const newId = current.length ? Math.max(...current.map(r => r.id)) + 1 : 1;
    this.revisionsSubject.next([...current, { id: newId, ...data }]);
    }

    updateRevision(id: number, data: Omit<Revision, 'id'>): void {
    this.revisionsSubject.next(
        this.revisionsSubject.value.map(r => (r.id === id ? { id, ...data } : r))
    );
    }

    removeRevision(id: number): void {
    this.revisionsSubject.next(this.revisionsSubject.value.filter(r => r.id !== id));
    }

    //opzionale
    revisionsByVehicle$(vehicleId: number) {
    return this.revisions$.pipe(
        map(list => list.filter(r => r.vehicleId === vehicleId))
    );
    }


    //APPOINTMENTS SERVICES
    private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
    appointments$ = this.appointmentsSubject.asObservable();

    upcomingAppointments$ = this.appointments$.pipe(
        map(apps => {
        const todayIso = new Date().toISOString().slice(0, 10);
        return apps.filter(a => a.date >= todayIso).length;
        })
    );

    addAppointment(data: Omit<Appointment, 'id'>): void {
    const current = this.appointmentsSubject.value;
    const newId = current.length ? Math.max(...current.map(a => a.id)) + 1 : 1;
    this.appointmentsSubject.next([...current, { id: newId, ...data }]);
    }

    removeAppointment(id: number): void {
    this.appointmentsSubject.next(this.appointmentsSubject.value.filter(a => a.id !== id));
    }

    updateAppointment(id: number, data: Omit<Appointment, 'id'>): void {
    this.appointmentsSubject.next(
        this.appointmentsSubject.value.map(a => (a.id === id ? { id, ...data } : a))
    );
    }
}
