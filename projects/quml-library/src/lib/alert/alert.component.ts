import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'quml-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertType: any;
  @Output() closeAlert = new EventEmitter();
  @Output() showSolution = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeAlertBox(event) {
    this.closeAlert.emit({
      close: true
    });
  }

  viewSolution() {
    this.showSolution.emit({
      solution: true
    });
  }

}
