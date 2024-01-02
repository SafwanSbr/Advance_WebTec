import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { SessionGuard } from '../user-list/session.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './service.service';

@UseGuards(new SessionGuard())


@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  
  @Post('insert')
  @UsePipes(new ValidationPipe())
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }


  
  @Get('/get')
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.serviceService.findAll();
  }


  
  @Get('/get/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.serviceService.findOne(+id);
  }



  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
   async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ) {
    const result= this.serviceService.update(+id, updateServiceDto);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 


  
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id', ParseIntPipe) id: string) {
    const result= this.serviceService.remove(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 
  
}
