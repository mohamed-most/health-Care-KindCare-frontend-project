import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReg } from './doctor-reg';

describe('DoctorReg', () => {
  let component: DoctorReg;
  let fixture: ComponentFixture<DoctorReg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorReg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorReg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
