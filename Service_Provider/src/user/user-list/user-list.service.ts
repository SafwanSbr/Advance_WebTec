import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UserList } from './entities/user-list.entity';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList)
    private UserListRepo: Repository<UserList>,
    //private mailerService: MailerService,
  ) {}
  async insert(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password = hassedpassed;
    
    return this.UserListRepo.save(mydto);
  }

  findAll() {
    return this.UserListRepo.find({relations: ['admin','manager']});
  }

  

 findOne(id: number): Promise<any>

  {
   return this.UserListRepo.findOne({
     where: {id:id},
     relations: {
      admin: true,
      manager: true
      

       },
    });

   }
   async update(id: number, Dto: CreateUserListDto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(Dto.password, salt);
    Dto.password= hassedpassed;
    await this.UserListRepo.update(id, Dto);
    return this.UserListRepo.findOneBy({id});
    
  }
    
  

  remove(id: number) {
    const a= this.UserListRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  
 /* async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }*/

  async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password = hassedpassed;
    
    return this.UserListRepo.save(mydto);
  }

  async signin(mydto) {
    console.log(mydto.password);
    const mydata = await this.UserListRepo.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
}
