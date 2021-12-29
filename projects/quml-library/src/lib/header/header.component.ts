import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() questions?: any;
  @Input() duration?: any;
  @Input() warningTime?: string;
  @Input() disablePreviousNavigation: boolean;
  @Input() showTimer: boolean;
  @Input() totalNoOfQuestions: any;
  @Input() currentSlideIndex: any;
  @Input() active: boolean;
  @Input() initializeTimer: boolean;
  @Input() endPageReached: boolean;
  @Input() loadScoreBoard: boolean;
  @Input() replayed: boolean;
  @Input() currentSolutions: any;
  @Input() showFeedBack: boolean;
  @Output() nextSlideClicked = new EventEmitter<any>();
  @Output() prevSlideClicked = new EventEmitter<any>();
  @Output() durationEnds = new EventEmitter<any>();
  @Output() showSolution = new EventEmitter<any>();
  @Input() disableNext?: boolean;
  @Input() startPageInstruction?: string;
  @Input() showStartPage?: boolean;
  @Input() attempts?: { max: number, current: number };
  minutes: number;
  seconds: string | number;
  private intervalRef?;
  showWarning = false;
  isMobilePortrait = false;

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
    } else if (this.duration === 0 && this.showTimer && this.initializeTimer && !this.intervalRef) {
      this.showCountUp();
    }
    if (this.replayed && this.duration && this.showTimer) {
      this.showWarning = false;
      clearInterval(this.intervalRef)
      this.timer();
    } else if (this.replayed && this.duration === 0 && this.showTimer) {
      clearInterval(this.intervalRef)
      this.showCountUp();
    }
  }

  ngAfterViewInit() {
    this.isMobilePortrait = window.matchMedia("(max-width: 480px)").matches;;
  }

  ngOnDestroy() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  nextSlide() {
    if (!this.disableNext) {
      this.nextSlideClicked.emit({ type: 'next' });
    }
  }

  prevSlide() {
    if(!this.showStartPage && this.currentSlideIndex === 1) {
      return
    }
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
    if (this.duration > 0) {
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
          clearInterval(this.intervalRef);
          this.durationEnds.emit(true);
          return false;
        }
        if (parseInt(durationInSec) <= parseInt(this.warningTime)) {
          this.showWarning = true;
        }
        durationInSec--;
      }, 1000);
    }
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
