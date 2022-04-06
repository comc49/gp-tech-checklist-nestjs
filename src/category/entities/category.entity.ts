import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Checklist } from 'src/checklist/entities/checklist.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;


  @OneToMany(() => Checklist, checklist => checklist.category)
  @Field(() => [Checklist], {nullable: 'items'})
  checklists: Checklist[];

}
