import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
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
  
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookingStatusDto: CreateBookingStatusDto,
  ) {
    try{
      const result = await this.bookingStatusService.update(+id, createBookingStatusDto);
      return  { message: " updated Successfully"};
  }catch (error) {
      throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Some problrm occured.',
          },
          HttpStatus.FORBIDDEN,
        );
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
