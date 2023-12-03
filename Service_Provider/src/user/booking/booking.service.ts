import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookngRepo: Repository<Booking>,
  ) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookngRepo.save(createBookingDto);
  }

  findAll() {
    return this.bookngRepo.find();
  }

  findOne(id: number) {
    return this.bookngRepo.findOneBy({ id });
  }

  update(id: number, createBookingDto: CreateBookingDto) {
    const a= this.bookngRepo.update(id, createBookingDto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  remove(id: number) {
    const a= this.bookngRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
}
