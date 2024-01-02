import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private ServiceRepo: Repository<Service>,
  ) {}
  create(Dto: CreateServiceDto) {
    return this.ServiceRepo.save(Dto);
  }

  findAll() {
    return this.ServiceRepo.find();
  }

  findOne(id: number) {
    return this.ServiceRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateServiceDto) {
    const a= this.ServiceRepo.update(id, Dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  remove(id: number) {
    const a= this.ServiceRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
}
