import { IVehicle } from './vehicle.interface';

export interface IVehicleRepository {
  save(vehicle: IVehicle): Promise<IVehicle>;
  findAll(): Promise<IVehicle[]>;
  findById(id: string): Promise<IVehicle | null>;
  update(id: string, vehicleData: Partial<IVehicle>): Promise<IVehicle | null>;
  remove(id: string): Promise<boolean>;
  findByType(type: string, limit?: number): Promise<IVehicle[]>;
}
