import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaCard } from './mesa-card';

describe('MesaCard', () => {
  let component: MesaCard;
  let fixture: ComponentFixture<MesaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
