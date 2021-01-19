import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxComponent } from './combobox.component';

describe('ComboboxComponent', () => {
  let component: ComboboxComponent<any>;
  let fixture: ComponentFixture<ComboboxComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
