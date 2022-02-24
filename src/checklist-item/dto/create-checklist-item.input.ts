import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChecklistItemInput {
  @Field((type) => Int)
  id: number;

  @Field()
  task: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field()
  description: string;

}
