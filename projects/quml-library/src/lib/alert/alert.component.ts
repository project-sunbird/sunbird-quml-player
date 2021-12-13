import { Component, Output, EventEmitter, Input, 
  AfterViewInit, OnDestroy, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'quml-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() alertType: any;
  @Input() isHintAvailable: boolean;
  @Input() showSolutionButton: boolean;
  @Output() closeAlert = new EventEmitter();
  @Output() showSolution = new EventEmitter();
  @Output() showHint = new EventEmitter();


  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close('close');
  }


  previousActiveElement: HTMLElement;

  ngOnInit() {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }

  ngAfterViewInit() {
    const alertBody = document.querySelector('.quml-alert__body');

    setTimeout(() => {
      const wrongButton = document.querySelector('#wrongButton') as HTMLElement;
      const correctButton = document.querySelector('#correctButton') as HTMLElement;
      const hintButton = document.querySelector('#hintButton') as HTMLElement;
  
      if (this.alertType === 'wrong') {
        wrongButton.focus();
      } else if (this.alertType === 'correct' && this.showSolutionButton) {
        correctButton.focus();
      }
    }, 100);
  }

  viewHint() {
    this.showHint.emit({
      hint: true,
    });
  }

  viewSolution() {
    this.showSolution.emit({
      solution: true,
    });
  }

  close(type) {
    this.closeAlert.emit({ type });
  }

  ngOnDestroy() {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }
}
