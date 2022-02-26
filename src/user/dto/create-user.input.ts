import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  picture: string;

  @Field()
  accessToken: string;

}
