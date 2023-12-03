import { AdminList } from 'src/admin/admin-list/entities/admin-list.entity';
import { Salary } from 'src/admin/salary/entities/salary.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';

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
  
  @ManyToOne(() => Salary, (Salary) => Salary.Manager)
  Salary: Salary;

  @OneToOne(() => AdminList, (admin) => admin.manager)
  @JoinColumn({name:"AdID"})
  admin: AdminList;


  @OneToOne(() => UserList, (user) => user.manager)
  @JoinColumn({name:"UserID"})
  user: UserList;
}
