import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { CreateWorkerListDto } from 'src/worker/worker-list/dto/create-worker-list.dto';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
import { CreateUserListDto } from 'src/user/user-list/dto/create-user-list.dto';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserList } from 'src/user/user-list/entities/user-list.entity';

@Injectable()
export class ManageService {
  constructor(
    @InjectRepository(WorkerList)
    private workerRepo: Repository<WorkerList>,
    @InjectRepository(ManagerList)
    private managerRepo: Repository<ManagerList>,
    @InjectRepository(UserList)
    private UserRepo: Repository<UserList>,
  ) {}
  createUser(dto: CreateUserListDto) {
    return this.UserRepo.save(dto);
  }

  findAllUser() {
    return this.UserRepo.find();
  }

  findOneUserById(id: number) {
    return this.UserRepo.findOneBy({ id });
  }
  /*findOneWorkerByName(name: string) {
    return this.workerRepo.findOneBy({ name });
  }*/

  async updateUserById(id: number, dto: CreateUserListDto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(dto.password, salt);
    dto.password= hassedpassed;
    await this.UserRepo.update(id, dto);
    return this.UserRepo.findOneBy({id});
    
  }

    
  
    
     async removeUser(id: number) {
       await this.UserRepo.delete(id);
      
  
      }

  
  
  createManager(dto: CreateManagerListDto) {
    return this.managerRepo.save(dto);
   

    }
  

  findAllManager() {
    return this.managerRepo.find();
  }

  findOneManagerById(id: number) {
    return this.managerRepo.findOneBy({ id });
  }
  /*findOneManagerByName(name: string) {
    return this.managerRepo.findOneBy({ name });
  }*/

  async updateManagerById(id: number, dto: CreateManagerListDto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(dto.password, salt);
    dto.password= hassedpassed;
    await this.UserRepo.update(id, dto);
    return this.UserRepo.findOneBy({id});
    
  }

  async removeManager(id: number) {
    await this.UserRepo.delete(id);
   

   }

    
  

  
  
}
