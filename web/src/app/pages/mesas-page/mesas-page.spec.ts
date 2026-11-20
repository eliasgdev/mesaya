import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasPage } from './mesas-page';

describe('MesasPage', () => {
  let component: MesasPage;
  let fixture: ComponentFixture<MesasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MesasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
