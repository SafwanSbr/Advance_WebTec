import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { CreateWorkerListDto } from 'src/worker/worker-list/dto/create-worker-list.dto';
import { CreateManagerListDto } from 'src/manager/manager_list/dto/create-manager_list.dto';
import { CreateUserListDto } from 'src/user/user-list/dto/create-user-list.dto';
import { WorkerList } from 'src/worker/worker-list/entities/worker-list.entity';
import { Repository } from 'typeorm';
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

  updateUserById(id: number, dto: CreateUserListDto) {
    const a= this.UserRepo.update(id, dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }

  removeUser(id: number) {
    const a= this.UserRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

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

  updateManagerById(id: number, dto: CreateManagerListDto) {
    const a=this.managerRepo.update(id, dto);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  

  removeManager(id: number) {
    const a= this.managerRepo.delete(id);
    if(a){
      return 1;
    } else {
      return 0;
    }

    }
  
}
