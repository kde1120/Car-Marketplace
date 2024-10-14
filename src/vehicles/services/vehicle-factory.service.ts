import { Injectable, Inject } from '@nestjs/common';
import { IVehicleFactory } from '../interfaces/vehicle-factory.interface';
import { IVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleFactoryService {
  private factories: Map<string, IVehicleFactory> = new Map();

  constructor(@Inject('VehicleFactories') factories: IVehicleFactory[]) {
    factories.forEach((factory) =>
      this.factories.set(factory.getType(), factory),
    );
  }

  createVehicle(type: string, data: Partial<IVehicle>): IVehicle {
    const factory = this.factories.get(type.toLowerCase());
    if (!factory) {
      throw new Error(`Unknown vehicle type: ${type}`);
    }
    return factory.createVehicle(data);
  }
}
