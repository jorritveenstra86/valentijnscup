import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubalkComponent } from './menubalk.component';

describe('MenubalkComponent', () => {
  let component: MenubalkComponent;
  let fixture: ComponentFixture<MenubalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
