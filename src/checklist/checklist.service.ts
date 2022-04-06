import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateChecklistInput } from './dto/create-checklist.input';
import { UpdateChecklistInput } from './dto/update-checklist.input';
import { Checklist } from './entities/checklist.entity';

@Injectable()
export class ChecklistService {
  constructor(@InjectRepository(Checklist) private checklistRepository: Repository<Checklist>) {
  }
  create(createChecklistInput: CreateChecklistInput) {
    const newChecklist = this.checklistRepository.create(createChecklistInput);
    return this.checklistRepository.save(newChecklist);
  }

  findAll() {
    return `This action returns all checklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistInput: UpdateChecklistInput) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
