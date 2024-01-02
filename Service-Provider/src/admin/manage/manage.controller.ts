import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
import { CreateWorkerListDto } from 'src/worker/worker-list/dto/create-worker-list.dto';
import { CreateUserListDto } from 'src/user/user-list/dto/create-user-list.dto';
import { ManageService } from './manage.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}
  

  @Post('user/insert')
  @UsePipes(new ValidationPipe())
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  insert(
    @Body() mydto: CreateUserListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(file);
    return this.manageService.createUser(mydto);
  }


  
  @Get('user/get')
  @UsePipes(new ValidationPipe())
  findAllUser() {
    return this.manageService.findAllUser();
  }


  
  @Get('user/get/:id')
  @UsePipes(new ValidationPipe())
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.manageService.findOneUserById(+id);
  }

  
  /*@Get('worker/:name')
  @UsePipes(new ValidationPipe())
  findOneWorkerByName(@Param('name') name: string) {
    return this.manageService.findOneWorkerById(+name);
  }*/


  
  @Patch('user/update/:id')
  @UsePipes(new ValidationPipe())
  async updateuser(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateUserListDto,
  ) {
    const result= this.manageService.updateUserById(+id, updateBookingDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 



  
  @Delete('user/delete/:id')
  @UsePipes(new ValidationPipe())
   async removeuser(@Param('id', ParseIntPipe) id: string) {
    const result= this.manageService.removeUser(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 


  
  @Post('manager/insert')
  @UsePipes(new ValidationPipe())
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() mydto: CreateManagerListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(file);
    return this.manageService.createManager(mydto);
  }



  
  @Get('manager/get')
  @UsePipes(new ValidationPipe())
  findAllmanager() {
    return this.manageService.findAllManager();
  }



  
  @Get('manager/get/:id')
  @UsePipes(new ValidationPipe())
  findOnemanager(@Param('id', ParseIntPipe) id: number) {
    return this.manageService.findOneManagerById(+id);
  }


  /*@Get('manager/:name')
  findOneManagerByName(@Param('name') name: string) {
    return this.manageService.findOneManagerById(+name);
  }*/


  
  @Patch('manager/update/:id')
  @UsePipes(new ValidationPipe())
  async updatemanager(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateManagerListDto,
  ) {
    const result = this.manageService.updateManagerById(+id, updateBookingDto);
    if (result === 1) {
        

      return { message: "update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 


  
  @Delete('manager/delete/:id')
  @UsePipes(new ValidationPipe())
  async removemanager(@Param('id', ParseIntPipe) id: string) {
    const result = this.manageService.removeManager(+id);
    if (result === 1) {
        

      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  } 
}
