import { ApiProperty } from '@nestjs/swagger';
import { IVehicle } from '../interfaces/vehicle.interface';

export class VehicleResponseDto {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the vehicle',
  })
  id: string;

  @ApiProperty({ example: 'Toyota', description: 'The brand of the vehicle' })
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'The model of the vehicle' })
  model: string;

  @ApiProperty({
    example: 2020,
    description: 'The manufacturing year of the vehicle',
  })
  year: number;

  @ApiProperty({ example: 25000, description: 'The price of the vehicle' })
  price: number;

  @ApiProperty({ example: 'New', description: 'The condition of the vehicle' })
  condition: string;

  @ApiProperty({ example: 'Car', description: 'The type of the vehicle' })
  type: string;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.brand = vehicle.brand;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.price = vehicle.price;
    this.condition = vehicle.condition;
    this.type = vehicle.getType();
  }
}
