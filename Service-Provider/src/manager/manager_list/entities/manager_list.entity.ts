import { AdminList } from 'src/admin/admin-list/entities/admin-list.entity';
import { Salary } from 'src/admin/salary/entities/salary.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('Manager_list')
export class ManagerList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  DOB: string;
  @Column()
  username: string;
  @Column()
  password: string;
  
  @Column()
  filename: string;


  @OneToMany(() => BookingStatus, (Booking_Status) => Booking_Status.Manager_list)
  Booking_Status: BookingStatus[];

  @ManyToOne(() => Salary, (Salary) => Salary.Manager)
  Salary: Salary;

  @OneToOne(() => AdminList, (admin) => admin.manager)
  @JoinColumn({name:"AdID"})
  admin: AdminList;
  
}
