import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../interfaces/vehicle-repository.interface';
import { VehicleFactoryService } from './vehicle-factory.service';
import { VehicleCalculationService } from './vehicle-calculation.service';
import { IVehicle } from '../interfaces/vehicle.interface';
import { VehicleDetailsDto } from '../dto/vehicle-detail.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('IVehicleRepository') private vehicleRepository: IVehicleRepository,
    private readonly vehicleFactoryService: VehicleFactoryService,
    private readonly vehicleCalculationService: VehicleCalculationService,
  ) {}

  async create(
    type: string,
    vehicleData: Partial<IVehicle>,
  ): Promise<IVehicle> {
    const vehicle = this.vehicleFactoryService.createVehicle(type, vehicleData);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<IVehicle[]> {
    return this.vehicleRepository.findAll();
  }

  async findOne(id: string): Promise<IVehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  async update(
    id: string,
    updateVehicleDto: Partial<IVehicle>,
  ): Promise<IVehicle | null> {
    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.vehicleRepository.remove(id);
  }

  async getVehicleDetails(id: string): Promise<any | null> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) return null;

    return new VehicleDetailsDto(vehicle, {
      depreciation: this.vehicleCalculationService.calculateDepreciation(
        vehicle,
        new Date().getFullYear() - vehicle.year,
      ),
      maintenanceCost:
        this.vehicleCalculationService.estimateMaintenanceCost(vehicle),
      resaleValue: this.vehicleCalculationService.calculateResaleValue(vehicle),
      eligibleForDiscount:
        this.vehicleCalculationService.isEligibleForDiscount(vehicle),
    });
  }

  async findByType(type: string, limit?: number): Promise<IVehicle[]> {
    return this.vehicleRepository.findByType(type, limit);
  }
}
