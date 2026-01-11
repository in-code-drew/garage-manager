export interface Revision {
  id: number;
  vehicleId: number;
  carPlate: string;
  date: string;       
  centerName: string;
  centerType: 'motorizzazione' | 'officina';
  outcome: 'superata' | 'ripetere' | 'respinta';
  notes?: string;
  nextExpiryDate: string;
}
