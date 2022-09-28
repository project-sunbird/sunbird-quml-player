import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface IIndicator {
  iconText: string;
  title: string;
  class: string;
}
@Component({
  selector: 'quml-progress-indicators',
  templateUrl: './progress-indicators.component.html',
  styleUrls: ['./progress-indicators.component.scss']
})
export class ProgressIndicatorsComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  indicators: IIndicator[] = [
    {
      iconText: '1',
      title: 'Correct',
      class: 'correct'
    },
    {
      iconText: '1',
      title: 'Incorrect',
      class: 'incorrect'
    },
    {
      iconText: '1',
      title: 'Attempted',
      class: 'attempted'
    },
    {
      iconText: '1',
      title: 'Not viewed',
      class: ''
    },
    {
      iconText: '1',
      title: 'Skipped',
      class: 'skipped'
    },
    {
      iconText: '1',
      title: 'Current',
      class: 'current'
    },
    {
      iconText: 'i',
      title: 'Info page',
      class: ''
    },
    {
      iconText: '<img src="./assets/flag_active.svg" alt="Flag logo: Show scoreboard">',
      title: 'Summary page',
      class: ''
    }];
  constructor() { }

  ngOnInit(): void {
  }

}
