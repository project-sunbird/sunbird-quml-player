import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'quml-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alertType: any;
  @Input() isHintAvailable : boolean;
  @Input() showSolutionButton: boolean;
  @Output() closeAlert = new EventEmitter();
  @Output() showSolution = new EventEmitter();
  @Output() showHint = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  viewHint(){
    this.showHint.emit({
      hint: true
    })
  }
  viewSolution() {
    this.showSolution.emit({
      solution: true
    });
  }

}
