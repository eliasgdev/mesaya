import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasGrid } from './mesas-grid';

describe('MesasGrid', () => {
  let component: MesasGrid;
  let fixture: ComponentFixture<MesasGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(MesasGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
