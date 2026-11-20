import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetailPage } from './pedido-detail-page';

describe('PedidoDetailPage', () => {
  let component: PedidoDetailPage;
  let fixture: ComponentFixture<PedidoDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
