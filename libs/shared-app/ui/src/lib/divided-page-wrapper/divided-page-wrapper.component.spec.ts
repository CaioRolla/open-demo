import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividedPageWrapperComponent } from './divided-page-wrapper.component';

describe('DividedPageWrapperComponent', () => {
  let component: DividedPageWrapperComponent;
  let fixture: ComponentFixture<DividedPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DividedPageWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividedPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
