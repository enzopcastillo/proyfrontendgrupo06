import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReunionesComponent } from './gestion-reuniones.component';

describe('GestionReunionesComponent', () => {
  let component: GestionReunionesComponent;
  let fixture: ComponentFixture<GestionReunionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionReunionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
