import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueSynthetiquesComponent } from './vue-synthetiques.component';

describe('VueSynthetiquesComponent', () => {
  let component: VueSynthetiquesComponent;
  let fixture: ComponentFixture<VueSynthetiquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueSynthetiquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueSynthetiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
