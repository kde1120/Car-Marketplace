import { IVehicle } from './vehicle.interface';

export interface IVehicleFactoryService {
  createVehicle(type: string, data: Partial<IVehicle>): IVehicle;
}
