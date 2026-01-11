export interface Vehicle {
    id: number; // id interno
    clientId: number; // id proprietario
    ownerFullName: string;
    category: string;
    make: string; // marca
    model: string;
    firstRegistrationDate: string;
    carPlate: string;

    grossWeightKg: number; // massa a pieno carico
    seats: number;
    usageType: string;
}