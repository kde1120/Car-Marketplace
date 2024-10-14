import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from '../services/vehicles.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle-reponse.dto';
import { VehicleDetailsDto } from '../dto/vehicle-detail.dto';
import { CustomException } from '../../common/exceptions/custom-exception';
import { ErrorCode } from '../../common/enums/error-codes.enum';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
    type: VehicleResponseDto,
  })
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    try {
      const vehicle = await this.vehiclesService.create(
        createVehicleDto.type,
        createVehicleDto,
      );
      return new VehicleResponseDto(vehicle);
    } catch (error) {
      throw new CustomException(ErrorCode.VEHICLE_CREATION_FAILED, error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({
    status: 200,
    description: 'Return all vehicles.',
    type: [VehicleResponseDto],
  })
  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehiclesService.findAll();
    return vehicles.map((vehicle) => new VehicleResponseDto(vehicle));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the vehicle.',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) {
      throw new CustomException(ErrorCode.VEHICLE_NOT_FOUND);
    }
    return new VehicleResponseDto(vehicle);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully updated.',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const updatedVehicle = await this.vehiclesService.update(
      id,
      updateVehicleDto,
    );
    if (!updatedVehicle) {
      throw new CustomException(ErrorCode.VEHICLE_NOT_FOUND);
    }
    return new VehicleResponseDto(updatedVehicle);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    const isDeleted = await this.vehiclesService.remove(id);
    if (!isDeleted) {
      throw new CustomException(ErrorCode.VEHICLE_NOT_FOUND);
    }
  }

  @Get(':id/details')
  @ApiOperation({ summary: 'Get detailed information about a vehicle' })
  @ApiResponse({
    status: 200,
    description: 'Return the vehicle details.',
    type: VehicleDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async getVehicleDetails(@Param('id') id: string): Promise<VehicleDetailsDto> {
    const details = await this.vehiclesService.getVehicleDetails(id);
    if (!details) {
      throw new CustomException(ErrorCode.VEHICLE_NOT_FOUND);
    }
    return details;
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get vehicles by type' })
  @ApiResponse({
    status: 200,
    description: 'Return vehicles of specified type.',
    type: [VehicleResponseDto],
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findByType(
    @Param('type') type: string,
    @Query('limit') limit?: number,
  ): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehiclesService.findByType(type, limit);
    return vehicles.map((vehicle) => new VehicleResponseDto(vehicle));
  }
}
