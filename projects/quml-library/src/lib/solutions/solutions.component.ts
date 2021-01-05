import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() question: any;
  @Input() options: any;
  @Input() solutions: any;

  constructor() { }

  ngOnInit() {
  }

  closeSolution() {
    this.close.emit({
      close: true
    });
  }

}
