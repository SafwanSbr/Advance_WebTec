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
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';


@UseGuards(new SessionGuard())


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  

  @Post('/insert')
  @UsePipes(new ValidationPipe())
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }


  
  @Get('/get')
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.paymentService.findAll();
  }


  
  @Get('/get/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paymentService.findOne(+id);
  }


  
  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: string, @Body() Dto: CreatePaymentDto) {
    const result= this.paymentService.update(+id, Dto);{
      if (result === 1) {
        

        return { message: "delete Successful." };

      }
      else {

        return { message: "Not found" };

      }
    } 
    }
  


  
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id', ParseIntPipe) id: string) {
    const result = this.paymentService.remove(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 

}