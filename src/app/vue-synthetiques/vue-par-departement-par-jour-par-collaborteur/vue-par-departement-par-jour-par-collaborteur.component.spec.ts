import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueParDepartementParJourParCollaborteurComponent } from './vue-par-departement-par-jour-par-collaborteur.component';

describe('VueParDepartementParJourParCollaborteurComponent', () => {
  let component: VueParDepartementParJourParCollaborteurComponent;
  let fixture: ComponentFixture<VueParDepartementParJourParCollaborteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueParDepartementParJourParCollaborteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueParDepartementParJourParCollaborteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
