import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() questions?: any;
  @Input() duration?: any;
  @Input() warningTime?: number;
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
  seconds: any;
  private intervalRef?;
  showWarning = false;

  time: any;
  constructor() {
  }


  ngOnInit() {
    if (this.duration && this.showTimer) {
      this.minutes = Math.floor(this.duration / 60);
      this.seconds = this.duration - this.minutes * 60 <  10 ? `0${this.duration - this.minutes * 60}`  :  this.duration - this.minutes * 60;
    }
  }

  ngOnChanges() {
    if (this.duration && this.showTimer && this.initializeTimer && !this.intervalRef) {
      this.timer();
    } else if(this.duration === 0 && this.showTimer && this.initializeTimer && !this.intervalRef) {
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

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.body.style.backgroundColor = 'white';
  }

  timer() {
    let durationInSec = this.duration;
    this.intervalRef = setInterval(() => {
      let min = ~~(durationInSec / 60);
      let sec = (durationInSec % 60);
      if (sec < 10) {
        this.time = min + ':' + '0' + sec;
      } else {
        this.time = min + ':' + sec;
      }
      if (durationInSec === 0) {
        this.durationEnds.emit(true);
        return false;
      }      
      if (durationInSec <= this.warningTime) {
        this.showWarning = true;
      }
      durationInSec--;
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
