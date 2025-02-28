import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesPage } from './pipes.page';

describe('PipesPage', () => {
  let component: PipesPage;
  let fixture: ComponentFixture<PipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
