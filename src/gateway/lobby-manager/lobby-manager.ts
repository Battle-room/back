import { Injectable } from "@nestjs/common";
import Lobby from "../lobby/lobby";

@Injectable()
export default class LobbyManager {
  lobby: Lobby[] = []

  constructor() {}
}