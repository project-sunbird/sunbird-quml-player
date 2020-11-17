import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'quml-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertType: any;
  @Input() showSolutionButton: boolean;
  @Output() closeAlert = new EventEmitter();
  @Output() showSolution = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  viewSolution() {
    this.showSolution.emit({
      solution: true
    });
  }

}
