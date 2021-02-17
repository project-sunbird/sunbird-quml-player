import { TestBed } from '@angular/core/testing';

import { UtilService } from './util-service';
import {options , responseDeclaration , selectedOptions , questions} from './service-data';

describe('UtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service).toBeTruthy();
  });

  it('should return unique id', () => {
    const service: UtilService = TestBed.get(UtilService);
    const id = service.uniqueId();
    expect(id).toBeDefined();
  });

  it('should return time spent text', () => {
    const service: UtilService = TestBed.get(UtilService);
    const time = service.getTimeSpentText(10);
    console.log(time);
    expect(time).toBeDefined();
  });

  it('should return dynamic key' , () => {
    const service: UtilService = TestBed.get(UtilService);
    const keys = ['responseDec', 'response1'];
    spyOn(service,'getKeyValue').and.returnValue('response1');
    const key = service.getKeyValue(keys);
    expect(key).toEqual('response1'); 
  });

  it('should check weather array has duplictes' , () => {
    const service: UtilService = TestBed.get(UtilService);
    spyOn(service,'hasDuplicates').and.returnValue(true);
    let duplicates = service.hasDuplicates(selectedOptions , options);
    expect(duplicates).toBe(true);
  });

  it('should return question type', () => {
    const service: UtilService = TestBed.get(UtilService);
    let qType = service.getQuestionType(questions , 0);
    expect(qType).toBe('MCQ');
  })
});
