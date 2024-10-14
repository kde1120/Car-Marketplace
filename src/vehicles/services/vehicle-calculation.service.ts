import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehicleCalculationService {
  calculateDepreciation(vehicle: Vehicle, years: number): number {
    return vehicle.price * Math.pow(0.9, years);
  }

  estimateMaintenanceCost(vehicle: Vehicle): number {
    const baseMaintenanceCost = 500;
    const ageFactor = new Date().getFullYear() - vehicle.year;
    return baseMaintenanceCost * (1 + ageFactor * 0.1);
  }

  calculateResaleValue(vehicle: Vehicle): number {
    const depreciation = this.calculateDepreciation(
      vehicle,
      new Date().getFullYear() - vehicle.year,
    );
    return vehicle.price - depreciation;
  }

  isEligibleForDiscount(vehicle: Vehicle): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - vehicle.year > 5;
  }
}
