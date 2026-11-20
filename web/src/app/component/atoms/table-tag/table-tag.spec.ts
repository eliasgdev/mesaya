import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTag } from './table-tag';

describe('TableTag', () => {
  let component: TableTag;
  let fixture: ComponentFixture<TableTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTag],
    }).compileComponents();

    fixture = TestBed.createComponent(TableTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
