import { Component, OnInit, Input, AfterViewInit, OnChanges, HostListener, AfterContentChecked, } from '@angular/core';

@Component({
  selector: 'quml-smart-layout-mcq',
  templateUrl: './smart-layout-mcq.component.html',
  styleUrls: ['./smart-layout-mcq.component.css']
})
export class SmartLayoutMcqComponent implements OnInit, OnChanges {
  showMore = false;

  @Input() data: any;
  @Input() identifier: any;
  @Input() slideIndex: any;
  question: any;
  options: any;
  config: any;
  htmlTag: any;
  showQumlPopUp = false;
  constructor() { }

  ngOnInit() {
    this.question = this.data.assessment_item.metadata.editorState.question;
    this.options = this.data.assessment_item.metadata.editorState.options;
    this.config = this.data.assessment_item.metadata.config;
    this.unSelectAllOptions();
    this.slideIndex = `slide-${this.slideIndex}`;
  }

  ngOnChanges() {
  }


  unSelectAllOptions() {
    this.options.forEach((ele) => {
      ele.selected = false;
    });
  }

  optionSelected(option) {
    this.options.forEach((ele) => {
      if (ele.value.resindex === option.value.resindex) {
        ele.selected = true;
      } else {
        ele.selected = false;
      }
    });
  }

  zoomInImage(option) {
    console.log('body', option.value.body.includes('img'));
    this.showQumlPopUp = true;
    this.htmlTag = option.value.body.replace( /class=/g, 'klass=');
    console.log(this.htmlTag);

  }

  closePopUp() {
      this.showQumlPopUp = false;
  }

}


