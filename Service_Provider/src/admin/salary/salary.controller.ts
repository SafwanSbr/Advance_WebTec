import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  
  @Post('/insert')
  @UsePipes(new ValidationPipe())
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }

  
  @Get('/get')
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.salaryService.findAll();
  }


  
  @Get('/get/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(+id);
  }


  
  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateSalaryDto: CreateSalaryDto) {
    const result = this.salaryService.update(+id, updateSalaryDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 


  
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: string) {
    const result = this.salaryService.remove(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 
}
