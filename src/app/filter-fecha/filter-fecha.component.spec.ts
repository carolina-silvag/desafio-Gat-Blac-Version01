import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFechaComponent } from './filter-fecha.component';

describe('FilterFechaComponent', () => {
  let component: FilterFechaComponent;
  let fixture: ComponentFixture<FilterFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
