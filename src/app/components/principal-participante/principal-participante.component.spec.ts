import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalParticipanteComponent } from './principal-participante.component';

describe('PrincipalParticipanteComponent', () => {
  let component: PrincipalParticipanteComponent;
  let fixture: ComponentFixture<PrincipalParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
