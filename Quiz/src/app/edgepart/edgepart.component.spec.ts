import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgepartComponent } from './edgepart.component';

describe('EdgepartComponent', () => {
  let component: EdgepartComponent;
  let fixture: ComponentFixture<EdgepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
