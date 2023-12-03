import { Module } from '@nestjs/common';
import { BookingStatusService } from './booking_status.service';
import { BookingStatusController } from './booking_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from '../manager_list/entities/manager_list.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { BookingStatus } from './entities/booking_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus,UserList ])],
  controllers: [BookingStatusController],
  providers: [BookingStatusService]
})
export class BookingStatusModule {}
