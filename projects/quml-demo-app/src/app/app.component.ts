import { Component, OnInit } from '@angular/core';
import { samplePlayerConfig } from './quml-library-data';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contentId = 'do_213484313936035840138';
  playerConfig: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getQuestionSet(this.contentId).subscribe(res => {
      this.initializePlayer(res);
    });
  }

  initializePlayer(metadata) {
    let qumlConfigMetadata: any = localStorage.getItem('config') || '{}';
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
  }

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));

    // Store the metaData locally
    if (event.eid === 'END') {
      let qumlMetaDataConfig = event.metaData;
      localStorage.setItem('config', JSON.stringify(qumlMetaDataConfig));
      this.playerConfig.config = { ...samplePlayerConfig.config, ...qumlMetaDataConfig };;
    }
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }
}
