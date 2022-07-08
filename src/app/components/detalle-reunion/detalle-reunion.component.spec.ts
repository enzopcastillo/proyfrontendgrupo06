import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReunionComponent } from './detalle-reunion.component';

describe('DetalleReunionComponent', () => {
  let component: DetalleReunionComponent;
  let fixture: ComponentFixture<DetalleReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
