import {
    IsInt,
    IsNotEmpty,
  } from 'class-validator';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
  
  export class CreateBookingStatusDto {
   // @IsInt({ message: 'id should be integer' })
    @IsNotEmpty({ message: 'Id is required' })
    id: number;
    @IsNotEmpty({ message: 'OrderType is required' })
    OrderType: string;
    @IsNotEmpty({ message: 'OrderDateis required' })
    OrderDate: string;
    @IsNotEmpty({ message: 'OrderTime is required' })
    OrderTime: string;
    @IsNotEmpty({ message: 'Customer is required' })
    CustomerName: string;
    
  }
  