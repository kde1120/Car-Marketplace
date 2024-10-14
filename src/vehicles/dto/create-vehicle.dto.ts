import { IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum VehicleType {
  CAR = 'car',
  MOTORCYCLE = 'motorcycle',
}

export class CreateVehicleDto {
  @ApiProperty({ enum: VehicleType, description: 'Type of the vehicle' })
  @IsEnum(VehicleType)
  type: VehicleType;

  @ApiProperty({ description: 'Brand of the vehicle' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Model of the vehicle' })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Year of manufacture',
    minimum: 1900,
    maximum: new Date().getFullYear(),
  })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty({ description: 'Price of the vehicle', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Condition of the vehicle' })
  @IsString()
  condition: string;
}
