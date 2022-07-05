import { Component, OnInit } from '@angular/core';
import { samplePlayerConfig } from './quml-library-data';
import { DataService } from './services/data.service';
import { QuestionCursor, PlayerService, Player, QumlPlayerConfig } from '@project-sunbird/sunbird-quml-player-v9';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contentId = 'do_213484313936035840138';
  playerConfig: any;

  constructor(private dataService: DataService, public playerService: PlayerService, private questionCursorImplementationService: QuestionCursor) { }

  ngOnInit() {
    this.dataService.getQuestionSet(this.contentId).subscribe(res => {
      this.initializePlayer(res);
    });
  }

  initializePlayer(metadata) {
    let qumlConfigMetadata: any = localStorage.getItem(`config_${this.contentId}`) || '{}';
    let config;
    if (qumlConfigMetadata) {
      qumlConfigMetadata = JSON.parse(qumlConfigMetadata);
      config = { ...samplePlayerConfig.config, ...qumlConfigMetadata };
    }
    this.playerConfig = {
      context: samplePlayerConfig.context,
      config: config ? config : samplePlayerConfig.config,
      metadata,
      data: {}
    };

    /* Feed the data to the player by creating player instance when Angular's input is not being used */
    // const player: Player = this.playerService.getPlayerInstance()
    // player.questionCursorImplementationService = this.questionCursorImplementationService;
    // player.setPlayerConfig(this.playerConfig);
  }

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));

    // Store the metaData locally
    if (event.eid === 'END') {
      let qumlMetaDataConfig = event.metaData;
      localStorage.setItem(`config_${this.contentId}`, JSON.stringify(qumlMetaDataConfig));
      this.playerConfig.config = { ...samplePlayerConfig.config, ...qumlMetaDataConfig };;
    }
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }
}
