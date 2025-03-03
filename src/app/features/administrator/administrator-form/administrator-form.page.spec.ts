import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministratorFormPage } from './administrator-form.page';

describe('AdministratorFormPage', () => {
  let component: AdministratorFormPage;
  let fixture: ComponentFixture<AdministratorFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
