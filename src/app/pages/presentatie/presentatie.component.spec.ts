import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatieComponent } from './presentatie.component';

describe('PresentatieComponent', () => {
  let component: PresentatieComponent;
  let fixture: ComponentFixture<PresentatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
