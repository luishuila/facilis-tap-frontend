import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUpdatePage } from './users-update.page';

describe('UsersUpdatePage', () => {
  let component: UsersUpdatePage;
  let fixture: ComponentFixture<UsersUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
