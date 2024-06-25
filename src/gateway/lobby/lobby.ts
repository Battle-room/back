import User from '../user/user';

export default class Lobby {
  readonly id: string;
  readonly name: string;
  private readonly password: string;
  private readonly lider: User;
  private readonly packageId: string;
  users: User[] = [];

  constructor(
    id: string,
    name: string,
    password: string,
    lider: User,
    packageId: string,
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.lider = lider;
    this.packageId = packageId;
    this.users.push(lider);
  }
}
