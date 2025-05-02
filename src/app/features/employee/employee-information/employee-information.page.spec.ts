import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeInformationPage } from './employee-information.page';

describe('EmployeeInformationPage', () => {
  let component: EmployeeInformationPage;
  let fixture: ComponentFixture<EmployeeInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
