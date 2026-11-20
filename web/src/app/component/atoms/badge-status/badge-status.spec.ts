import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeStatus } from './badge-status';

describe('BadgeStatus', () => {
  let component: BadgeStatus;
  let fixture: ComponentFixture<BadgeStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
