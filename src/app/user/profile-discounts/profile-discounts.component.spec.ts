import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDiscountsComponent } from './profile-discounts.component';

describe('ProfileDiscountsComponent', () => {
  let component: ProfileDiscountsComponent;
  let fixture: ComponentFixture<ProfileDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDiscountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
