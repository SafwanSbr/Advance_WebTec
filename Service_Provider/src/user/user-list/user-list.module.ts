import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { UserList } from './entities/user-list.entity';
import { UserListController } from './user-list.controller';
import { UserListService } from './user-list.service';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, UserList,ManagerList])],
  controllers: [UserListController],
  providers: [UserListService],
})
export class UserListModule {}
