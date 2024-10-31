import { computed, Injectable, signal } from '@angular/core';
import { Player, PlayerState } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerStateService {
  #state = signal<PlayerState>({
    player: null,
    players: [],
    loading: false,
    error: null,
    successMessage: null,
  });

  public player = computed(() => this.#state().player);
  public players = computed(() => this.#state().players);
  public loading = computed(() => this.#state().loading);
  public error = computed(() => this.#state().error);
  public successMessage = computed(() => this.#state().successMessage)

  public loadingState() {
    this.#state.update((state) => ({ ...state, loading: true, error: null }));
  }

  public errorState(message: string) {
    this.#state.update((state) => ({
      ...state,
      loading: false,
      error: message || 'An unknown error ocurred',
    }));
  }

  public savePlayerState(player: Player) {
    this.#state.update((state) => ({
      ...state,
      loading: false,
      error: null,
      player: player,
      successMessage: "El jugador ha sido registrado con éxito!"
    }));
  }
}
