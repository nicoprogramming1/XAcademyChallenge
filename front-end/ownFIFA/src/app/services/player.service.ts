import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PlayerStateService } from './player-state.service';
import { Player } from '../interfaces/player.interface';
import { catchError, delay, finalize, map, Observable, of, switchMap } from 'rxjs';
import { PlayerResponse, PlayersResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private playerStateService = inject(PlayerStateService);

  getAllPlayers(page: number): Observable<PlayersResponse | null> {
    this.playerStateService.loadingState(); // define loading: true en el state

    return of(null).pipe(
      delay(1000), // Retardo de 1 segundo para simular demora y ver los spinner de carga
      switchMap(() => 
        this.http.get<PlayersResponse>(`${this.apiUrl}/player?page=${page}`)
      ),
      map((res) => {
        if (res.success) {
          this.playerStateService.loadAllPlayersState(res.data.players);  // carga los jugadores en el state para ponerlos a disposicion global
          console.log('Desde el service, lista de jugadores: ', res.data.players);
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
        this.playerStateService.stopLoadingState(); // loading: false al state
      })
    );
  }

  getPlayerById(id: number): Observable<Player | null> {
    this.playerStateService.loadingState();

    return of(null).pipe(
      delay(1000), // Retardo de 1 segundo
      switchMap(() => 
        this.http.get<PlayerResponse>(`${this.apiUrl}/player/${id}`)
      ),
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

    return of(null).pipe(
      delay(1000), // Retardo de 1 segundo
      switchMap(() =>
        this.http.post<PlayerResponse>(`${this.apiUrl}/player`, player)
      ),
      map((res) => {
        if (res.success) {
          this.playerStateService.savePlayerState(res.data);
          console.log('Se ha creado con éxito el/la jugador/a ', res.data.longName);
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

    return of(null).pipe(
      delay(1000), // Retardo de 1 segundo
      switchMap(() => 
        this.http.delete<PlayerResponse>(`${this.apiUrl}/player/${id}`)
      ),
      map((res) => {
        if (res.success) {
          this.playerStateService.deletePlayerState(id);
          return res.data;
        } else {
          throw new Error(res.message || 'Error desconocido');
        }
      }),
      catchError((err) => {
        const errorMessage = err.message || 'Error en la eliminación del jugador';
        this.handleError(errorMessage);
        return of(null);
      }),
      finalize(() => {
        this.playerStateService.stopLoadingState();
      })
    );
  }

  private handleError(err: string) {
    this.playerStateService.errorState(err);  // carga el error en state
    console.error('Se ha producido un error (desde el handleError): ', err);
  }
}
