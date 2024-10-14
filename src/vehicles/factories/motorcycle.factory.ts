import { Injectable } from '@nestjs/common';
import { IVehicleFactory } from '../interfaces/vehicle-factory.interface';
import { Motorcycle } from '../entities/motorcycle.entity';
import { IVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class MotorcycleFactory implements IVehicleFactory {
  createVehicle(data: Partial<IVehicle>): IVehicle {
    return new Motorcycle(data);
  }

  getType(): string {
    return 'motorcycle';
  }
}
