import { CommonModule } from '@angular/common';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { SunbirdPlayerSdkModule } from '@project-sunbird/sunbird-player-sdk-v9';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MainPlayerComponent } from '../../../quml-library/src/lib/main-player/main-player.component';
import { QumlLibraryComponent } from '../../../quml-library/src/lib/quml-library.component';
import { McqComponent } from '../../../quml-library/src/lib/mcq/mcq.component';
import { HeaderComponent } from '../../../quml-library/src/lib/header/header.component';
import { SaComponent } from '../../../quml-library/src/lib/sa/sa.component';
import { McqQuestionComponent } from '../../../quml-library/src/lib/mcq-question/mcq-question.component';
import { McqOptionComponent } from '../../../quml-library/src/lib/mcq-option/mcq-option.component';
import { QumlPopupComponent } from '../../../quml-library/src/lib/quml-popup/quml-popup.component';
import { McqImageOptionComponent } from '../../../quml-library/src/lib/mcq-image-option/mcq-image-option.component';
import { ZoomInComponent } from '../../../quml-library/src/lib/icon/zoom-in/zoom-in.component';
import { StarComponent } from '../../../quml-library/src/lib/icon/star/star.component';
import { PreviousComponent } from '../../../quml-library/src/lib/icon/previous/previous.component';
import { NextComponent } from '../../../quml-library/src/lib/icon/next/next.component';
import { PreviousActiveComponent } from '../../../quml-library/src/lib/icon/previous-active/previous-active.component';
import { BookmarkComponent } from '../../../quml-library/src/lib/icon/bookmark/bookmark.component';
import { HintComponent } from '../../../quml-library/src/lib/icon/hint/hint.component';
import { AnsComponent } from '../../../quml-library/src/lib/icon/ans/ans.component';
import { ShareComponent } from '../../../quml-library/src/lib/icon/share/share.component';
import { CorrectComponent } from '../../../quml-library/src/lib/icon/correct/correct.component';
import { ScoreboardComponent } from '../../../quml-library/src/lib/scoreboard/scoreboard.component';
import { StartpageComponent } from '../../../quml-library/src/lib/startpage/startpage.component';
import { TimerComponent } from '../../../quml-library/src/lib/icon/timer/timer.component';
import { ContentComponent } from '../../../quml-library/src/lib/icon/content/content.component';
import { StartpagestariconComponent } from '../../../quml-library/src/lib/icon/startpagestaricon/startpagestaricon.component';
import { NextActiveComponent } from '../../../quml-library/src/lib/icon/next-active/next-active.component';
import { AlertComponent } from '../../../quml-library/src/lib/alert/alert.component';
import { CloseComponent } from '../../../quml-library/src/lib/icon/close/close.component';
import { McqSolutionsComponent } from '../../../quml-library/src/lib/mcq-solutions/mcq-solutions.component';
import { DurationtimerComponent } from '../../../quml-library/src/lib/icon/durationtimer/durationtimer.component';
import { AudioComponent } from '../../../quml-library/src/lib/icon/audio/audio.component';
import { WrongComponent } from '../../../quml-library/src/lib/icon/wrong/wrong.component';
import { MenuComponent } from '../../../quml-library/src/lib/icon/menu/menu.component';
import { SafeHtmlPipe } from '../../../quml-library/src/lib/pipes/safe-html/safe-html.pipe';
import { SectionPlayerComponent } from '../../../quml-library/src/lib/section-player/section-player.component';
import { QuestionCursor } from '../../../quml-library/src/lib/quml-question-cursor.service';
import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
import { HttpClientModule } from '@angular/common/http';
import { ProgressIndicatorsComponent } from '../../../quml-library/src/lib/progress-indicators/progress-indicators.component';

@NgModule({
  declarations: [
    MainPlayerComponent,
    QumlLibraryComponent,
    McqComponent,
    HeaderComponent,
    SaComponent,
    McqQuestionComponent,
    McqOptionComponent,
    QumlPopupComponent,
    McqImageOptionComponent,
    ZoomInComponent,
    StarComponent,
    PreviousComponent,
    NextComponent,
    PreviousActiveComponent,
    BookmarkComponent,
    HintComponent,
    AnsComponent,
    ShareComponent,
    CorrectComponent,
    ScoreboardComponent,
    StartpageComponent,
    TimerComponent,
    ContentComponent,
    StartpagestariconComponent,
    NextActiveComponent,
    AlertComponent,
    CloseComponent,
    McqSolutionsComponent,
    DurationtimerComponent,
    AudioComponent,
    WrongComponent,
    MenuComponent,
    SafeHtmlPipe,
    SectionPlayerComponent,
    ProgressIndicatorsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CarouselModule.forRoot(),
    SunbirdPlayerSdkModule,
    HttpClientModule
  ],
  providers: [{ provide: QuestionCursor, useClass: QuestionCursorImplementationService }],
  entryComponents: [MainPlayerComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
    const customElement = createCustomElement(MainPlayerComponent, { injector: this.injector });
    customElements.define('sunbird-quml-player', customElement);
  }
}
