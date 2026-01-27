import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReg } from './patient-reg';

describe('PatientReg', () => {
  let component: PatientReg;
  let fixture: ComponentFixture<PatientReg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
