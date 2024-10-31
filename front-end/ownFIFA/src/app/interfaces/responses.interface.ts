import { Player } from "./player.interface"

export interface PlayerResponse {
    success: boolean,
    message: string,
    data: Player
  }
  
  export interface PlayersResponse {
    success: boolean,
    message: string,
    data: Player[]
  }