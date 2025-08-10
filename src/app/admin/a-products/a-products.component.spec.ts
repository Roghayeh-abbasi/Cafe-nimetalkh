import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AProductsComponent } from './a-products.component';

describe('AProductsComponent', () => {
  let component: AProductsComponent;
  let fixture: ComponentFixture<AProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
