import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, OnDestroy } from '@angular/core';
import { iif } from 'rxjs';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
      this.timer();
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

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.body.style.backgroundColor = 'white';
  }

  timer() {
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
}
