import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsComponent } from './ans.component';

describe('AnsComponent', () => {
  let component: AnsComponent;
  let fixture: ComponentFixture<AnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
