import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZonesComponent } from './time-zones.component';

describe('TimeZonesComponent', () => {
  let component: TimeZonesComponent;
  let fixture: ComponentFixture<TimeZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
