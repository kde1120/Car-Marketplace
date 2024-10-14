import { Vehicle } from './vehicle.entity';
import { IRentable } from '../interfaces/rentable.interface';

export class Motorcycle extends Vehicle implements IRentable {
  engineCapacity: number;

  constructor(data: Partial<Motorcycle>) {
    super(data);
    this.engineCapacity = data.engineCapacity;
  }

  getType(): string {
    return 'Motorcycle';
  }

  calculateRentalPrice(days: number): number {
    return this.price * days * 0.05; // Example calculation
  }
}
