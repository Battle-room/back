import { BadRequestException, Injectable } from '@nestjs/common';
import User from '../user/user';

@Injectable()
export default class UserManager {
  private users: User[] = [];
  constructor() {}

  addUser(user: User): void {
    const checkUser = this.checkIfUserExist(user);
    if (checkUser) throw new BadRequestException('User already connected');
    this.users.push(user);
  }

  removeUser(socketId: string): void {
    this.users.splice(
      this.users.findIndex(
        (existingUser) => existingUser.socketId === socketId,
      ),
      1,
    );
  }

  private checkIfUserExist(user: User): User | null {
    const checkUser = this.users.find(
      (existingUser) => existingUser.id === user.id,
    );
    if (checkUser) return checkUser;
    return null;
  }

  getUserBySocketId(socketId: string): User {
    return this.users.find((user) => user.socketId === socketId);
  }
}
