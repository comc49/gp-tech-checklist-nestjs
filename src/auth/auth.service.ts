import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }


  async validateUser(details: UserDetails) {
    const { email } = details;

    const user = await this.userRepo.findOne({email})
    // console.log(user, ' user in validate User');
    
    if (user) {
      await this.userRepo.update({ email }, details);
      console.log('Updated');
      return user;
    }

    return this.createUser(details);
  }

  async createUser(details: UserDetails) {
    console.log('Creating a User');
    const user = await this.userRepo.create(details);
    // console.log(user, 'user ');
    return this.userRepo.save(user);
      
  }

  findUser(email: string): Promise<User| undefined> {
    return this.userRepo.findOne({ email });
  }

}
