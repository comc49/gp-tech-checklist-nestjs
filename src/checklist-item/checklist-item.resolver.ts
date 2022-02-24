import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChecklistItemService } from './checklist-item.service';
import { ChecklistItem } from './entities/checklist-item.entity';
import { CreateChecklistItemInput } from './dto/create-checklist-item.input';
import { UpdateChecklistItemInput } from './dto/update-checklist-item.input';

@Resolver(() => ChecklistItem)
export class ChecklistItemResolver {
  constructor(private readonly checklistItemService: ChecklistItemService) {}

  @Mutation(() => ChecklistItem)
  createChecklistItem(@Args('createChecklistItemInput') createChecklistItemInput: CreateChecklistItemInput) {
    return this.checklistItemService.create(createChecklistItemInput);
  }

  @Query(() => [ChecklistItem], { name: 'checklistItem' })
  findAll() {
    return this.checklistItemService.findAll();
  }

  @Query(() => ChecklistItem, { name: 'checklistItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.checklistItemService.findOne(id);
  }

  @Mutation(() => ChecklistItem)
  updateChecklistItem(@Args('updateChecklistItemInput') updateChecklistItemInput: UpdateChecklistItemInput) {
    return this.checklistItemService.update(updateChecklistItemInput.id, updateChecklistItemInput);
  }

  @Mutation(() => ChecklistItem)
  removeChecklistItem(@Args('id', { type: () => Int }) id: number) {
    return this.checklistItemService.remove(id);
  }
}
