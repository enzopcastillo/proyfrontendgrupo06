import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReunionesComponent } from './registro-reuniones.component';

describe('RegistroReunionesComponent', () => {
  let component: RegistroReunionesComponent;
  let fixture: ComponentFixture<RegistroReunionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroReunionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
