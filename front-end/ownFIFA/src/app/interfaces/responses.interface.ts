import { Player } from "./player.interface"
import { User } from "./user.interface"

export interface PlayerResponse {
    success: boolean,
    message: string,
    data: Player
  }
  
  // cuando se pide la lista de jugadores la response involucra el total y las páginas en data
  export interface PlayersResponse {
    success: boolean,
    message: string,
    data: {
      players: Player[],
      totalCount: number,
      totalPages:  number,
      currentPage:  number,
    }
  }

  export interface UserResponse {
    success: boolean,
    message: string,
    data: User,
    token?: string;
  }