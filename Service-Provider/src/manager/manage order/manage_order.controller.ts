import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { CreateBookingStatusDto } from '../booking_status/dto/create-booking_status.dto';

import { ManageOrderService } from './manage_order.service';

@UseGuards(new SessionGuard())

@Controller('manageOrder')
export class ManageOrderController {
  constructor(private readonly manageOrderService: ManageOrderService) {}

  @Get('/get')
  findAll() {
    return this.manageOrderService.findOrder();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.manageOrderService.findOneOrder(+id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateManageOrderDto: CreateBookingStatusDto,
  ) {
    const result = this.manageOrderService.updateOrder(+id, updateManageOrderDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const result= this.manageOrderService.removeOrder(+id);

  if (result === 1) {
        

        return { message: "delete Successful." };

      }
      else {

        return { message: "Not found" };

      }
    } 
}
