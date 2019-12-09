import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoerScoresComponent } from './invoer-scores.component';

describe('InvoerScoresComponent', () => {
  let component: InvoerScoresComponent;
  let fixture: ComponentFixture<InvoerScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoerScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoerScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
