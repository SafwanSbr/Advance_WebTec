import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Salary } from './entities/salary.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary)
    private salaryRepo: Repository<Salary>,
  ) {}
  create(Dto: CreateSalaryDto) {
    return this.salaryRepo.save(Dto);
  }

  findAll() {
    return this.salaryRepo.find({ relations: ['Worker', 'Manager'] });
  }
  findOne(id: number): Promise<any>
  // return this.EmployeeRepo.findOneBy({id:id});
  {
   return this.salaryRepo.findOne({
     where: {id:id},
     relations: {
      Worker: true,

      Manager: true

       },
    });

   }


 /* findOne(id: number) {
    return this.salaryRepo.findOneBy({ id });
  }*/

  update(id: number, Dto: CreateSalaryDto) {
    const a= this.salaryRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  

  remove(id: number) {
    const a= this.salaryRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  
}
