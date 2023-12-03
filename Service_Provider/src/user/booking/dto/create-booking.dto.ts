import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  
  id: number;
  @IsNotEmpty({ message: 'Time is required' })
  time: string;

  @IsNotEmpty({ message: 'date is required' })
  date: string;


  UserListId: number;

  ServiceId: number;

  CheckoutId: number;
}
