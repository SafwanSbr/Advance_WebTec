import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdminListDto } from './dto/create-admin-list.dto';
import { Repository } from 'typeorm';
import { AdminList } from './entities/admin-list.entity';

@Injectable()
export class AdminListService {
  constructor(
    @InjectRepository(AdminList)
    private adminListRepo: Repository<AdminList>,
    private mailerService: MailerService,
  ) {}
  create(Dto: CreateAdminListDto) {
    return this.adminListRepo.save(Dto);
  }

  findAll() {
    return this.adminListRepo.find({relations: ['user', 'manager']} );
  }

  findOne(id: number): Promise<any>
  // return this.EmployeeRepo.findOneBy({id:id});
  {
   return this.adminListRepo.findOne({
     where: {id:id},
     relations: {
      user: true,

      manager: true

       },
    });

   }


  /*findOne(id: number) {
    return this.adminListRepo.findOneBy({ id });
  }*/

  update(id: number, Dto: CreateAdminListDto) {
    const a= this.adminListRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }
  }

  remove(id: number) {
    const a =this.adminListRepo.delete(id);
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
    return this.adminListRepo.save(mydto);
  }

  async signin(mydto) {
    console.log(mydto.password);
    const mydata = await this.adminListRepo.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
}
