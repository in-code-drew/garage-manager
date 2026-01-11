export interface Appointment {
    id: number;
    clientId: number;
    ownerFullName: string;
    vehicleId: number;
    date: string;
    hour: string;
    note?: string;
}