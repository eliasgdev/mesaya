import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClose } from './modal-close';

describe('ModalClose', () => {
  let component: ModalClose;
  let fixture: ComponentFixture<ModalClose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalClose],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalClose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
