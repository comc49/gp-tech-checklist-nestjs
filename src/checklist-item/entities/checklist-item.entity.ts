import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Checklist } from 'src/checklist/entities/checklist.entity';

@Entity()
@ObjectType()
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  task: string;

  @Column()
  @Field(() => Boolean)
  completed: boolean;

  @Column()
  @Field()
  description: string;


  @ManyToOne(() => Checklist, checklist => checklist.checklistItems)
  @Field(() => Checklist, {nullable: true})
  checklist?: Checklist

  @ManyToOne(() => ChecklistItem, checklistItem => checklistItem.checklist)
  @Field(() => [ChecklistItem], {nullable: 'itemsAndList'})
  checklists?: ChecklistItem[];
}
