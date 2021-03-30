import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QumlLibraryModule, QuestionCursor } from '@project-sunbird/sunbird-quml-player'
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { QuestionCursorImplementationService } from './question-cursor-implementation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QumlLibraryModule,
    CarouselModule.forRoot()
  ],
  providers: [{
    provide: QuestionCursor,
    useClass: QuestionCursorImplementationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
