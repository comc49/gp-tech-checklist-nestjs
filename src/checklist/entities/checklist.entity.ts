import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { ChecklistItem } from 'src/checklist-item/entities/checklist-item.entity';
import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Checklist {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Boolean)
  completed: boolean;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => Category, category => category.checklists)
  @Field(() => Category, {nullable: true})
  category?: Category;

  @ManyToOne(() => User, user => user.checklists)
  @Field(() => User, {nullable: true})
  user?: User

  @ManyToOne(() => ChecklistItem, checklistItem => checklistItem.checklist)
  @Field(() => [ChecklistItem], {nullable: 'items'})
  checklistItems: ChecklistItem[];
}
