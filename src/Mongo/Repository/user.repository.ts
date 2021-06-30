import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/DTO/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async getUserById(userID: string): Promise<User> {
    return await this.userModel.findById(userID, { __v: false });
  }

  async getUserByEmail(userEmail: string): Promise<User[]> {
    return await this.userModel.find(
      { email: { $regex: userEmail, $options: 'i' } },
      { __v: false },
    );
  }

  async saveUser(newUser: UserDTO): Promise<User> {
    const saveUser = new this.userModel(newUser);
    return await saveUser.save();
  }

  async updateUserById(userID: string, newUser: UserDTO): Promise<User> {
    return await this.userModel.findById(userID).replaceOne(newUser);
  }

  async deleteUserById(userID: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userID);
  }
}
