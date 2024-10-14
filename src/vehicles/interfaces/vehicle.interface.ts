export interface IVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  getType(): string;
  update(data: Partial<IVehicle>): void;
}
