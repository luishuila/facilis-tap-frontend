import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministratorMenuPage } from './administrator-menu.page';

describe('AdministratorMenuPage', () => {
  let component: AdministratorMenuPage;
  let fixture: ComponentFixture<AdministratorMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
