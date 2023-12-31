import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingStatusDto } from './dto/create-booking_status.dto';
import { BookingStatus } from './entities/booking_status.entity';

@Injectable()
export class BookingStatusService {
  constructor(
    @InjectRepository(BookingStatus)
    private BookingStatusListRepo: Repository<BookingStatus>,
  ) {}

  create(Dto: CreateBookingStatusDto) {
    return this.BookingStatusListRepo.save(Dto);
  }

  findAll() {
    return this.BookingStatusListRepo.find();
  }

  findOne(id: number) {
    return this.BookingStatusListRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateBookingStatusDto) {
    const a= this.BookingStatusListRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  remove(id: number) {
    const a= this.BookingStatusListRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
}
