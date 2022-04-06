import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistResolver } from './checklist.resolver';
import { Checklist } from './entities/checklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist])],
  providers: [ChecklistResolver, ChecklistService]
})
export class ChecklistModule {}
