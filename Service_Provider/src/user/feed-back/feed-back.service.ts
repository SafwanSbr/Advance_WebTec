import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedBackDto } from './dto/create-feed-back.dto';
import { FeedBack } from './entities/feed-back.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(FeedBack)
    private feedbackRepo: Repository<FeedBack>,
  ) {}
  create(Dto: CreateFeedBackDto) {
    return this.feedbackRepo.save(Dto);
  }

  
}
