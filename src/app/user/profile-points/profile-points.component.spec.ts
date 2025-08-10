import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePointsComponent } from './profile-points.component';

describe('ProfilePointsComponent', () => {
  let component: ProfilePointsComponent;
  let fixture: ComponentFixture<ProfilePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
