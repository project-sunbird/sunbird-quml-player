import { Component } from '@angular/core';
import { playerConfig1 } from './quml-library-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quml-demo-app';
  qumlMetaDataConfig = {};
  // qumlMetaDataConfig: any = JSON.parse(localStorage.getItem('config')) || {};  // to Get locally saved metaData
  config = { ...playerConfig1.config, ...this.qumlMetaDataConfig };
  QumlPlayerConfig = { ...playerConfig1, config: {...this.config, nextContent: { name: 'Roti aur Kutta', identifier: 'do_231234332232' }}};

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
