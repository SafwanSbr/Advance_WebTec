import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateAdminListDto } from './dto/create-admin-list.dto';
import { loginDto } from './dto/login.dto';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { AdminListService } from './admin-list.service';

@Controller('admin')
export class AdminListController {
  constructor(private readonly adminListService: AdminListService) {}
  
  

  @Get('/get')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async findAll() {
   
    try{
      const result = await this.adminListService.findAll();
      return {message:"Admin list successfully found.", result};
  }catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'No admin list found.'
      },
      HttpStatus.NOT_FOUND,
      );
  }
}

  

  
 
  @Get('/get/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try{
      const result = await this.adminListService.findOne(+id);
      return {message: "Admin found successfully.", result}
  }catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'No admin found.'
      },
      HttpStatus.NOT_FOUND,
      );
  }
}
  

  
  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAdminListDto: CreateAdminListDto,
  ) {
    try{
      const result = await this.adminListService.update(+id, createAdminListDto);
      return  { message: "Admin updated Successfully", result};
  }catch (error) {
      throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Failed to update admin.',
          },
          HttpStatus.FORBIDDEN,
        );
    }
  
}
  


  
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async remove(@Param('id', ParseIntPipe) id: number) {
    
   
    try{
      const result = this.adminListService.remove(+id);
      if (result) {
          return { message: `Admin with ID ${id} deleted successfully.` };
      } else {
          return { message: `Admin with ID ${id} not found.` };
      }}catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'Failed to delete admin.',
              },
              HttpStatus.BAD_REQUEST,
            );
        }
  }
    
  


  
  /*@Post('/sendemail')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  sendEmail(@Body() mydata) {
    return this.adminListService.sendEmail(mydata);
  }*/


  @Post('/signup')
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
    @Body() mydto: CreateAdminListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 160000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(file);
    return this.adminListService.signup(mydto);
  }



  @Get('/signin')
  @UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())

  async signin(@Session() session, @Body() mydto: loginDto) {

    try {
      const result = await this.adminListService.signin(mydto);
 
      if (result === 1) {
        session.email = mydto.email;
        console.log(session.email);

        return { message: "Admin Login Successful." };

      }
      else {

        return { message: "Invalid email or password." };

      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'An error occurred during sign-in.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }



  @Get('/signout')
  signout(@Session() session) {

    try {
      if (session != null) {
         
          if (session.destroy()) {
              return { message: "You are logged out." };
          }
          else {
              throw new UnauthorizedException("You are not authorized to sign-out.");
          }
      }
      else {
          return { message: "You are already logged out." };
      }
  } catch (error) {
      throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred during sign-out.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
   
  }
}
