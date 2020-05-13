import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationJourFerieComponent } from './modification-jour-ferie.component';

describe('ModificationJourFerieComponent', () => {
  let component: ModificationJourFerieComponent;
  let fixture: ComponentFixture<ModificationJourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationJourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
