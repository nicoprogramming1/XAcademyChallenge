import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PlayerStateService } from './player-state.service';
import { Player } from '../interfaces/player.interface';
import { catchError, finalize, map, Observable, of } from 'rxjs';
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
        }),
        finalize(() => {
          this.playerStateService.stopLoadingState();
        })
      );
  }

  getPlayerById(id: number): Observable<Player | null> {
    this.playerStateService.loadingState();
    return this.http.get<PlayerResponse>(`${this.apiUrl}/player/${id}`).pipe(
      map((res) => {
        if (res.success) {
          this.playerStateService.loadPlayerState(res.data);
          console.log('Desde el service en el front: ', res.data);
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      }),
      finalize(() => {
        this.playerStateService.stopLoadingState();
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
          throw new Error(res.message || 'Error desconocido');
        }
      }),
      catchError((err) => {
        const errorMessage = err.message || 'Error al guardar el jugador';
        this.handleError(errorMessage);
        return of(null);
      }),
      finalize(() => {
        this.playerStateService.stopLoadingState();
      })
    );
  }

  deletePlayer(id: number): Observable<Player | null> {
    this.playerStateService.loadingState();
    return this.http.delete<PlayerResponse>(`${this.apiUrl}/player/${id}`).pipe(
      map((res) => {
        if (res.success) {
          this.playerStateService.deletePlayerState(id);
          return res.data;
        } else {
          throw new Error(res.message || 'Error desconocido');
        }
      }),
      catchError((err) => {
        const errorMessage =
          err.message || 'Error en la eliminación del jugador';
        this.handleError(errorMessage);
        return of(null);
      }),
      finalize(() => {
        this.playerStateService.stopLoadingState(); // Asegura que el estado de carga se detenga
      })
    );
  }

  private handleError(err: string) {
    this.playerStateService.errorState(err);
    console.error('Se ha producido un error (desde el handleError): ', err);
  }
}
