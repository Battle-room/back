export default class User {

  readonly id: string;
  readonly socketId: string;

  constructor(id: string, socketId: string) {
    this.id = id;
    this.socketId = socketId;
  }
}