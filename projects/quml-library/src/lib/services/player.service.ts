import { Injectable } from '@angular/core';
import { Player } from '../player/src/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player = new Player();
  constructor() { }

  getPlayerInstance(): Player {
    return this.player;
  }
}
