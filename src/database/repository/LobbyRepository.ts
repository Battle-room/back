import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { LobbyEntity } from "../entity/LobbyEntity";

@Injectable()
export class LobbyRepository {
  
  public create() {
    const key = uuidv4();
    const lobby = new LobbyEntity(key);
    return lobby;
  }
}