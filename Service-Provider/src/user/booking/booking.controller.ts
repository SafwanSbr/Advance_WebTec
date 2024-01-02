import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SessionGuard } from '../user-list/session.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(new SessionGuard())

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  

  @Post('/insert')
  @UsePipes(new ValidationPipe())
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }


  
  @Get('/get')
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.bookingService.findAll();
  }


  
  @Get('get/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.bookingService.findOne(+id);
  }


  
  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ) {
    const result= this.bookingService.update(+id, updateBookingDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 


  
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id', ParseIntPipe) id: string) {
    const result= this.bookingService.remove(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 
}
