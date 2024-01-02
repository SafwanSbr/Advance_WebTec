import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerList } from '../manager_list/entities/manager_list.entity';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';
import { CreateBookingStatusDto } from '../booking_status/dto/create-booking_status.dto';

@Injectable()
export class ManageOrderService {
  constructor(
    @InjectRepository(BookingStatus)
    private BookingStatusRepo: Repository<BookingStatus>,
  ) {}
  

  findOrder() {
    return this.BookingStatusRepo.find();
  }

  findOneOrder(id: number) {
    return this.BookingStatusRepo.findOneBy({ id });
  }

  updateOrder(id: number, Dto: CreateBookingStatusDto) {
    const a= this.BookingStatusRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  removeOrder(id: number) {
    const a=  this.BookingStatusRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  
}
