import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectfinishesComponent } from './selectfinishes.component';

describe('SelectfinishesComponent', () => {
  let component: SelectfinishesComponent;
  let fixture: ComponentFixture<SelectfinishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectfinishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectfinishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
