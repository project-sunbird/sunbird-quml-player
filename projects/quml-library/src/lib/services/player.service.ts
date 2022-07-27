import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../player/src/Player';
import { PlayerQuestionCursorImplementationService } from '../player/src/QuestionCusrsorImpl';
import { QuestionCursor } from '../quml-question-cursor.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player = new Player();
  constructor(public httpClient: HttpClient, public questionCursorImplementationService: QuestionCursor) {
    // this.player.questionCursorImplementationService = this.questionCursorImplementationService;
    this.player.playerQuestionCursor = new PlayerQuestionCursorImplementationService(this.questionCursorImplementationService, () => {
      console.log("getQuestionsCallback");
    }, () => {
      console.log("getQuestionCallback");
    });
  }

  getPlayerInstance(): Player {
    return this.player;
  }
  
}
