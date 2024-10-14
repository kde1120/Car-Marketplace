import { Injectable } from '@nestjs/common';
import { IVehicleRepository } from '../interfaces/vehicle-repository.interface';
import { IVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  private vehicles: Map<string, IVehicle> = new Map();
  private lastId: number = 0;

  async save(vehicle: IVehicle): Promise<IVehicle> {
    if (!vehicle.id) {
      this.lastId++;
      vehicle.id = this.lastId.toString();
    }
    this.vehicles.set(vehicle.id, vehicle);
    return vehicle;
  }

  async findAll(): Promise<IVehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async findById(id: string): Promise<IVehicle | null> {
    return this.vehicles.get(id) || null;
  }

  async update(
    id: string,
    vehicleData: Partial<IVehicle>,
  ): Promise<IVehicle | null> {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return null;

    vehicle.update({ ...vehicle, ...vehicleData });
    this.vehicles.set(id, vehicle);

    return vehicle;
  }

  async remove(id: string): Promise<boolean> {
    return this.vehicles.delete(id);
  }

  async findByType(type: string, limit?: number): Promise<IVehicle[]> {
    const filteredVehicles = Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.getType().toLowerCase() === type.toLowerCase(),
    );
    return filteredVehicles.slice(0, limit);
  }
}
