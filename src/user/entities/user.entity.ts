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
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  picture: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ name: 'access_token' })
  @Field()
  accessToken: string;

  @OneToMany(() => Checklist, checklist => checklist.user )
  @Field(() => [Checklist], {nullable: true})
  checklists?: Checklist[]

}
