import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerListDto } from './dto/create-manager_list.dto';
import { ManagerList } from './entities/manager_list.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerListService {
  constructor(
    @InjectRepository(ManagerList)
    private ManagerListRepo: Repository<ManagerList>,
    private mailerService: MailerService,
  ) {}
  create(Dto: CreateManagerListDto) {
    return this.ManagerListRepo.save(Dto);
  }

  findAll() {
    return this.ManagerListRepo.find({relations: ['admin']});
  }

  

  

  findOne(id: number): Promise<any>
  // return this.EmployeeRepo.findOneBy({id:id});
  {
   return this.ManagerListRepo.findOne({
     where: {id:id},
     relations: {
      admin: true,

      

       },
    });

   }


  update(id: number, Dto: CreateManagerListDto) {
    const a = this.ManagerListRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  remove(id: number) {
    const a= this.ManagerListRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  /*async sendEmail(mydata) {
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
    return this.ManagerListRepo.save(mydto);
  }
  async signin(mydto) {
    console.log(mydto);
    const mydata = await this.ManagerListRepo.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
}
