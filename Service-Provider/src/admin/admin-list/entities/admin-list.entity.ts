import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admin')
export class AdminList {
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

  @OneToOne(() => ManagerList, (manager) => manager.admin)
  @JoinColumn({name:"ManagerID"})
  manager: ManagerList;
  

  @OneToOne(() => UserList, (user) => user.admin)
  @JoinColumn({name:"UserID"})
  user: UserList;

  

  
}
