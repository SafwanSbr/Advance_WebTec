import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { SessionGuard } from '../user-list/session.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';


@UseGuards(new SessionGuard())

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

 
  
}
