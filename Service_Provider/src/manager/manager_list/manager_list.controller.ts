import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UnauthorizedException, UploadedFile, ParseFilePipe, UseInterceptors, MaxFileSizeValidator, FileTypeValidator, UseGuards, Put, UsePipes, ValidationPipe, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ManagerListService } from './manager_list.service';
import { CreateManagerListDto } from './dto/create-manager_list.dto';
import { loginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from 'src/user/user-list/session.guard';

@Controller('manager')
export class ManagerListController {
  constructor(private readonly managerListService: ManagerListService) {}

 /* @Post('/insert')
  create(@Body() createManagerListDto: CreateManagerListDto) {
    return this.managerListService.create(createManagerListDto);
  }*/
  
  @Get('/get') 
  @UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.managerListService.findAll();
  }


  
  @Get('/get/:id')
  @UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.managerListService.findOne(+id);
  }


  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createManagerListDto: CreateManagerListDto,
  ) {
    try{
      const result = await this.managerListService.update(+id, createManagerListDto);
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
  @UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: string) {
    const result = await this.managerListService.remove(+id);
 
      if (result === 1) {
        

        return { message: "delete Successful." };

      }
      else {

        return { message: "Not found" };

      }
    } 
  


  
 /* @Post('/sendemail')
  @UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  sendEmail(@Body() mydata) {
    return this.managerListService.sendEmail(mydata);
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
    return this.managerListService.signup(mydto);
  }



  @Get('/signin')
  @UsePipes(new ValidationPipe())
  /*signin(@Session() session, @Body() mydto: loginDto) {
    if (this.managerListService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }*/

    async signin(@Session() session, @Body() mydto: loginDto) {

      try {
        const result = await this.managerListService.signin(mydto);
   
        if (result === 1) {
          session.email = mydto.email;
          console.log(session.email);
  
          return { message: "Manager Login Successful." };
  
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


  
  /*
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
}*/
