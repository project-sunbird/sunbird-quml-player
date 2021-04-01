import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'quml-mcq-solutions',
  templateUrl: './mcq-solutions.component.html',
  styleUrls: ['./mcq-solutions.component.scss']
})
export class McqSolutionsComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() question: any;
  @Input() options: any;
  @Input() solutions: any;
  showVideoSolution: boolean;
  @ViewChild('solutionVideoPlayer' , {static: true}) solutionVideoPlayer: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  closeSolution() {
    if (this.solutionVideoPlayer) {
      this.solutionVideoPlayer.nativeElement.pause();
    }
    this.close.emit({
      close: true
    });
  }

}
