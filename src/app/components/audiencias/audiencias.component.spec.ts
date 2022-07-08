import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciasComponent } from './audiencias.component';

describe('AudienciasComponent', () => {
  let component: AudienciasComponent;
  let fixture: ComponentFixture<AudienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudienciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
