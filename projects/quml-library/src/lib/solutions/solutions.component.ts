import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'quml-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit, OnChanges {
  @Output() close = new EventEmitter();
  @Input() question: any;
  @Input() options: any;
  @Input() solutions: any;
  @Input() media: any;
  videoUrl: string;
  showVideoSolution: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.solutions) {
      this.solutions.forEach((ele, index) => {
        if (ele.type === 'video') {
          this.media.forEach((e) => {
            if (e.id === this.solutions[index].value) {
                this.solutions[index].type = 'video'
                this.solutions[index].src = e.src;
                this.solutions[index].thumbnail = e.thumbnail;
            }
          })
        }
      })
    }    
  }

  closeSolution() {
    this.close.emit({
      close: true
    });
  }

}
