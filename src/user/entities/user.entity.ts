import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Checklist } from 'src/checklist/entities/checklist.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  role: string;

  @Column({ unique: true })
  @Field()
  email: string;


  @OneToMany(() => Checklist, checklist => checklist.user )
  @Field(type => [Checklist], {nullable: true})
  checklists?: Checklist[]

}
