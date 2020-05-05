import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerJourFerieComponent } from './lister-jour-ferie.component';

describe('ListerJourFerieComponent', () => {
  let component: ListerJourFerieComponent;
  let fixture: ComponentFixture<ListerJourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerJourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
