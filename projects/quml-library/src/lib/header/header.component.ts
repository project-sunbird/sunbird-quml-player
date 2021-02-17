import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() questions?: any;
  @Input() duration?: any;
  @Input() disablePreviousNavigation: boolean;
  @Input() showTimer: boolean;
  @Input() totalNoOfQuestions: any;
  @Input() currentSlideIndex: any;
  @Input() active: boolean;
  @Input() initializeTimer: boolean;
  @Input() endPageReached: boolean;
  @Output() nextSlideClicked = new EventEmitter<any>();
  @Output() prevSlideClicked = new EventEmitter<any>();
  @Output() durationEnds = new EventEmitter<any>();
  minutes: number;
  seconds: number;
  private intervalRef?;

  time: any;
  constructor() {
  }


  ngOnInit() {
    if (this.duration && this.showTimer) {
      const durationInSec = this.duration / 1000;
      this.minutes = ~~(durationInSec / 60);
      this.seconds = (durationInSec % 60);
    }
  }

  ngOnChanges() {
    if (this.duration && this.showTimer && this.initializeTimer && !this.intervalRef) {
      this.countDown();
    } else if(this.duration === undefined && this.showTimer && this.initializeTimer && !this.intervalRef) {
       this.showCountUp();
    }
  }

  ngOnDestroy() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  nextSlide() {
      this.nextSlideClicked.emit({ type: 'next' });
  }

  prevSlide() {
    if (!this.disablePreviousNavigation) {
      this.prevSlideClicked.emit({ event: 'previous clicked' });
    }
  }

  countDown() {
    const durationInSec = this.duration / 1000;
    let min = ~~(durationInSec / 60);
    let sec = (durationInSec % 60);
    this.intervalRef = setInterval(() => {
      if (sec === -1) {
        sec = 59;
        min = min - 1;
      } else if (sec === -1) {
        min = min - 1;
        sec = 59;
      }
      if (min === -1) {
        this.durationEnds.emit(true);
        return false;
      }
      if (sec < 10) {
        this.time = min + ':' + '0' + sec--;
      } else {
        this.time = min + ':' + sec--;
      }
    }, 1000);
  }

  showCountUp() {
    let min = 0;
    let sec = 0;
    this.intervalRef = setInterval(() => {
      if (sec === 59) {
        sec = 0;
        min = min + 1;
      }
      if (sec < 10) {
        this.time = min + ':' + '0' + sec++;
      } else {
        this.time = min + ':' + sec++;
      }
    }, 1000);
  }
}
