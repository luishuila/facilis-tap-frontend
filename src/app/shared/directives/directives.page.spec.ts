import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesPage } from './directives.page';

describe('DirectivesPage', () => {
  let component: DirectivesPage;
  let fixture: ComponentFixture<DirectivesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
