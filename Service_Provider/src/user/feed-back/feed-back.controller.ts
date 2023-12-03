import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SessionGuard } from '../user-list/session.guard';
import { CreateFeedBackDto } from './dto/create-feed-back.dto';
import { FeedBackService } from './feed-back.service';

@UseGuards(new SessionGuard())

@Controller('feed-back')

export class FeedBackController {
  constructor(private readonly feedBackService: FeedBackService) {}
  
 
  
}
