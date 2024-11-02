import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PlayerStateService } from './player-state.service';
import { Player } from '../interfaces/player.interface';
import { catchError, map, Observable, of } from 'rxjs';
import {
  PlayerResponse,
  PlayersResponse,
} from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private playerStateService = inject(PlayerStateService);

  getAllPlayers(page: number): Observable<PlayersResponse | null> {
    this.playerStateService.loadingState();
    return this.http
      .get<PlayersResponse>(`${this.apiUrl}/player?page=${page}`)
      .pipe(
        map((res) => {
          if (res.success) {
            this.playerStateService.loadAllPlayersState(res.data.players);
            console.log(
              'Desde el service, lista de jugadores: ',
              res.data.players
            );
            return res;
          } else {
            throw new Error(res.message);
          }
        }),
        catchError((err) => {
          this.handleError(err.message);
          return of(null);
        })
      );
  }

  getPlayerById(id: number): Observable<Player | null> {
    this.playerStateService.loadingState();
    return this.http.get<PlayerResponse>(`${this.apiUrl}/player/${id}`).pipe(
      map((res) => {
        if (res.success) {
          this.playerStateService.loadPlayerState(res.data);
          console.log("Desde el service en el front: ", res.data)
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      })
    );
  }

  savePlayer(player: Player): Observable<Player | null> {
    this.playerStateService.loadingState();
    return this.http.post<PlayerResponse>(`${this.apiUrl}/player`, player).pipe(
      map((res) => {
        if (res.success) {
          this.playerStateService.savePlayerState(res.data);
          console.log(
            'Se ha creado con éxito el/la jugador/a ',
            res.data.longName
          );
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      })
    );
  }

  private handleError(err: string) {
    this.playerStateService.errorState(err);
    console.error('Se ha producido un error (desde el handleError): ', err);
  }
}
