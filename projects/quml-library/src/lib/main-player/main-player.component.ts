import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QumlPlayerConfig } from '../quml-library-interface';
import * as _ from 'lodash-es';


@Component({
  selector: 'quml-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.scss']
})
export class MainPlayerComponent implements OnInit {
  @Input() QumlPlayerConfig: QumlPlayerConfig;
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();
  isSection: boolean;

  constructor() {  }

  ngOnInit() {
    let childMimeType = _.map(this.QumlPlayerConfig.metadata.children, 'mimeType');
    this.isSection = childMimeType[0] === 'application/vnd.sunbird.questionset' ? true : false;
  }

  getPlayerEvents(event) {
    this.playerEvent.emit(event);
  }

  getTelemetryEvents(event) {
    this.telemetryEvent.emit(event);
  }

}