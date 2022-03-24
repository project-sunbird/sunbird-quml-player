import { Component } from '@angular/core';
import { playerConfig1 } from './quml-library-data';
import { PlayerService } from 'projects/quml-library/src/lib/services/player.service';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public playerService: PlayerService, private questionCursorImplementationService: QuestionCursor) {
    this.playerService.getPlayerInstance().questionCursorImplementationService = this.questionCursorImplementationService;
  }

  title = 'quml-demo-app';
  qumlMetaDataConfig = {};
  // qumlMetaDataConfig: any = JSON.parse(localStorage.getItem('config')) || {};  // to Get locally saved metaData
  config = { ...playerConfig1.config, ...this.qumlMetaDataConfig };
  QumlPlayerConfig = { ...playerConfig1, config: { ...this.config, nextContent: { name: 'Roti aur Kutta', identifier: 'do_231234332232' } } };

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));

    // Store the metaData locally
    /* if (event.eid === 'END') {
      this.qumlMetaDataConfig = event?.metaData || {};
      localStorage.setItem('config', JSON.stringify(this.qumlMetaDataConfig));
      this.config = {
        ...data1,
        ...this.qumlMetaDataConfig,
      };
      this.QumlPlayerConfig.config = this.config;
    } */
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }
}
