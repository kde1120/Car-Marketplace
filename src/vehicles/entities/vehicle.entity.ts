import { IVehicle } from '../interfaces/vehicle.interface';

export abstract class Vehicle implements IVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;

  constructor(data: Partial<IVehicle>) {
    Object.assign(this, data);
  }

  abstract getType(): string;

  update(data: Partial<IVehicle>): void {
    Object.assign(this, data);
  }
}
