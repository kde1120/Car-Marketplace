import { ApiProperty } from '@nestjs/swagger';
import { VehicleResponseDto } from './vehicle-reponse.dto';
import { IVehicle } from '../interfaces/vehicle.interface';

export class VehicleDetailsDto extends VehicleResponseDto {
  @ApiProperty({
    example: 5000,
    description: 'The depreciation value of the vehicle',
  })
  depreciation: number;

  @ApiProperty({
    example: 1000,
    description: 'The estimated maintenance cost of the vehicle',
  })
  maintenanceCost: number;

  @ApiProperty({
    example: 20000,
    description: 'The estimated resale value of the vehicle',
  })
  resaleValue: number;

  @ApiProperty({
    example: true,
    description: 'Whether the vehicle is eligible for a discount',
  })
  eligibleForDiscount: boolean;

  constructor(vehicleDetails: IVehicle, calculatorVal) {
    super(vehicleDetails);
    this.depreciation = calculatorVal.depreciation;
    this.maintenanceCost = calculatorVal.maintenanceCost;
    this.resaleValue = calculatorVal.resaleValue;
    this.eligibleForDiscount = calculatorVal.eligibleForDiscount;
  }
}
