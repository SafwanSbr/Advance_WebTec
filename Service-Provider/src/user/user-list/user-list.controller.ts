import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { loginDto } from './dto/login.dto';
import { SessionGuard } from './session.guard';
import { UserListService } from './user-list.service';


@Controller('user')

export class UserListController {
  constructor(private readonly userListService: UserListService) { }

  /* @Post('/insert')
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
           new MaxFileSizeValidator({ maxSize: 160000 }),
           new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
         ],
       }),
     )
     file: Express.Multer.File,
   ) {
     mydto.filename = file.filename;
     console.log(file);
     return this.userListService.insert(mydto);
   }*/



  @Get('/get')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  findAll() {
    return this.userListService.findAll();
  }



  @Get('/get/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userListService.findOne(+id);
  }



  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() createUserListDto: CreateUserListDto,
  ) {
    const result = await this.userListService.update(+id, createUserListDto);
    if (result === 1) {


      return { message: "Update Successful." };

    }
    else {

      return { message: "Not found" };

    }
  }



  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async remove(@Param('id', ParseIntPipe) id: string) {
    const result = await this.userListService.remove(+id);

    if (result === 1) {


      return { message: "delete Successful." };

    }
    else {

      return { message: "Not found" };

    }
  }




  /* @Post('/sendemail')
   @UsePipes(new ValidationPipe())
   @UseGuards(new SessionGuard())
   sendEmail(@Body() mydata) {
     return this.userListService.sendEmail(mydata);
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
    @Body() mydto: CreateUserListDto,

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
    return this.userListService.signup(mydto);
  }



  @Get('/signin')
  @UsePipes(new ValidationPipe())
  /*signin(@Session() session, @Body() mydto: loginDto) {
    if (this.userListService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }*/

  async signin(@Session() session, @Body() mydto: loginDto) {

    try {
      const result = await this.userListService.signin(mydto);

      if (result === 1) {
        session.email = mydto.email;
        console.log(session.email);

        return { message: "User Login Successful." };

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


/*signout(@Session() session) {
  if (session.destroy()) {
    return { message: 'you are logged out' };
  } else {
    throw new UnauthorizedException('invalid actions');
  }
}
}*/
