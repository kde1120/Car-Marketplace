import { Vehicle } from './vehicle.entity';
import { IRentable } from '../interfaces/rentable.interface';

export class Car extends Vehicle implements IRentable {
  numberOfDoors: number;
  fuelType: string;

  constructor(data: Partial<Car>) {
    super(data);
    this.numberOfDoors = data.numberOfDoors;
    this.fuelType = data.fuelType;
  }

  getType(): string {
    return 'Car';
  }

  calculateRentalPrice(days: number): number {
    return this.price * days * 0.1; // Example calculation
  }
}
