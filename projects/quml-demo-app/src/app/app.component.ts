import { Component } from '@angular/core';
import { data1 } from './quml-library-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quml-demo-app';
  QumlPlayerConfig = data1;

  getPlayerEvents(event) {
    console.log('get player events', event);
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', event);
  }
}
