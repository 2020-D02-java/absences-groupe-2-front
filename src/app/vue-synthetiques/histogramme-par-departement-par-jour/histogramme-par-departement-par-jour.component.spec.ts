import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogrammeParDepartementParJourComponent } from './histogramme-par-departement-par-jour.component';

describe('HistogrammeParDepartementParJourComponent', () => {
  let component: HistogrammeParDepartementParJourComponent;
  let fixture: ComponentFixture<HistogrammeParDepartementParJourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogrammeParDepartementParJourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogrammeParDepartementParJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
