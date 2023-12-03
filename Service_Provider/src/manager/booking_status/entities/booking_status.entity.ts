//import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';

@Entity('Booking_Status')
export class BookingStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  OrderType: string;
  @Column()
  OrderDate: string;
  @Column()
  OrderTime: string;
  @Column()
  CustomerName: string;
  
}
