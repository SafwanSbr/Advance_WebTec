import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty({ message: 'Id is required' })
  id: number;

  @IsNotEmpty({ message: 'Service Name is required' })
  ServiceName: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'Availablity is required' })
  isAvailable: boolean;

  @IsNotEmpty({ message: 'Price is required' })
  price: number;
}
