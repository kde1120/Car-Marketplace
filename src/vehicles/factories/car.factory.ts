import { Injectable } from '@nestjs/common';
import { IVehicleFactory } from '../interfaces/vehicle-factory.interface';
import { Car } from '../entities/car.entity';
import { IVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class CarFactory implements IVehicleFactory {
  createVehicle(data: Partial<IVehicle>): IVehicle {
    return new Car(data);
  }

  getType(): string {
    return 'car';
  }
}
