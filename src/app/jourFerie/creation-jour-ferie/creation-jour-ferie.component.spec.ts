import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationJourFerieComponent } from './creation-jour-ferie.component';

describe('CreationJourFerieComponent', () => {
  let component: CreationJourFerieComponent;
  let fixture: ComponentFixture<CreationJourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationJourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
