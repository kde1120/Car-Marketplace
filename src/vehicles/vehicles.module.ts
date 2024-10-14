import { Module } from '@nestjs/common';
import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { VehicleFactoryService } from './services/vehicle-factory.service';
import { VehicleCalculationService } from './services/vehicle-calculation.service';
import { VehicleRepository } from './repositories/vehicle.repository';
import { CarFactory } from './factories/car.factory';
import { MotorcycleFactory } from './factories/motorcycle.factory';
// ... 다른 팩토리들 import

@Module({
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: 'IVehicleRepository',
      useClass: VehicleRepository,
    },
    {
      provide: 'IVehicleFactoryService',
      useClass: VehicleFactoryService,
    },
    {
      provide: 'IVehicleCalculationService',
      useClass: VehicleCalculationService,
    },
    {
      provide: 'VehicleFactories',
      useFactory: () => [
        new CarFactory(),
        new MotorcycleFactory(),
        // ... 다른 팩토리들
      ],
    },
  ],
})
export class VehiclesModule {}
