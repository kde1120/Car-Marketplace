import { IVehicle } from './vehicle.interface';

export interface IVehicleCalculationService {
  calculateDepreciation(vehicle: IVehicle, years: number): number;
  estimateMaintenanceCost(vehicle: IVehicle): number;
  calculateResaleValue(vehicle: IVehicle): number;
  isEligibleForDiscount(vehicle: IVehicle): boolean;
}
