import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOrdersComponent } from './a-orders.component';

describe('AOrdersComponent', () => {
  let component: AOrdersComponent;
  let fixture: ComponentFixture<AOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
