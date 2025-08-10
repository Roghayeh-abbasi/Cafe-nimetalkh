import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AUsersComponent } from './a-users.component';

describe('AUsersComponent', () => {
  let component: AUsersComponent;
  let fixture: ComponentFixture<AUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
