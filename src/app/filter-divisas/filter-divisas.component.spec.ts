import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDivisasComponent } from './filter-divisas.component';

describe('FilterDivisasComponent', () => {
  let component: FilterDivisasComponent;
  let fixture: ComponentFixture<FilterDivisasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDivisasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDivisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
