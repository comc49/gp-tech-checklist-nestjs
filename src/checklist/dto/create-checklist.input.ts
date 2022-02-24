import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChecklistInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field()
  description: string;

}
