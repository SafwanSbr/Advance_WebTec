import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { BookingStatusService } from './booking_status.service';
import { CreateBookingStatusDto } from './dto/create-booking_status.dto';

@UseGuards(new SessionGuard())


@Controller('booking-status')
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @Post('/insert')
  create(@Body() createBookingStatusDto: CreateBookingStatusDto) {
    return this.bookingStatusService.create(createBookingStatusDto);
  }

  @Get('/get')
  findAll() {
    return this.bookingStatusService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.bookingStatusService.findOne(+id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() createBookingStatusDto: CreateBookingStatusDto) {
    const result = this.bookingStatusService.update(+id, createBookingStatusDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const result = this.bookingStatusService.remove(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 
}
