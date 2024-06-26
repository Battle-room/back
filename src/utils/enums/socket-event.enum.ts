export enum SocketEvent {
  CREATE_LOBBY = 'createLobby',
  LOBBY_CREATED = 'lobbyCreated',
  JOIN_LOBBY = 'joinLobby',
  JOINED_LOBBY = 'joinedLobby',
  LEAVE_LOBBY = 'leaveLobby',
  LEFT_LOBBY = 'leftLobby',
  GET_LOBBY_LIST = 'getLobbyList',
  RECEIVE_LOBBY_LIST = 'receiveLobbyList',
  ERROR = 'error',
}
