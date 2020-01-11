import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitvoerPdfComponent } from './uitvoer-pdf.component';

describe('UitvoerPdfComponent', () => {
  let component: UitvoerPdfComponent;
  let fixture: ComponentFixture<UitvoerPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitvoerPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitvoerPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
