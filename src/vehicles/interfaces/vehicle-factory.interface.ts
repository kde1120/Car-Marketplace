import { IVehicle } from './vehicle.interface';

export interface IVehicleFactory {
  createVehicle(data: Partial<IVehicle>): IVehicle;
  getType(): string;
}
