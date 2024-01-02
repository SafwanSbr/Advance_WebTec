import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  //@IsNotEmpty({ message: 'Id is required' })
  //@IsInt({ message: 'id should be integer' })
  id: number;
  @IsNotEmpty({ message: 'Time is required' })
  time: string;

  @IsNotEmpty({ message: 'date is required' })
  date: string;


  UserListId: number;

  ServiceId: number;

  CheckoutId: number;
}
