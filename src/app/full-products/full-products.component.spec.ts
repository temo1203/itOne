import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProductsComponent } from './full-products.component';

describe('FullProductsComponent', () => {
  let component: FullProductsComponent;
  let fixture: ComponentFixture<FullProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
