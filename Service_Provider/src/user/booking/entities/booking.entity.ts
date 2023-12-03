import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Service } from 'src/user/service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time: string;
  @Column()
  date: string;
  @ManyToOne(() => UserList, (UserList) => UserList.Booking)
  UserList: UserList;
  @ManyToOne(() => Service, (Service) => Service.Booking)
  Service: Service;
  @OneToMany(() => Checkout, (Checkout) => Checkout.Booking)
  Checkout: Checkout[];
}
