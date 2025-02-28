import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomedosPage } from './homedos.page';

describe('HomedosPage', () => {
  let component: HomedosPage;
  let fixture: ComponentFixture<HomedosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
