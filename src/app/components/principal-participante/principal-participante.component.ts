import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-participante',
  templateUrl: './principal-participante.component.html',
  styleUrls: ['./principal-participante.component.css']
})
export class PrincipalParticipanteComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  Audiencias(){
    this.router.navigate(['principal/Participante/audiencias']);
  }

  Agenda(){
    this.router.navigate(['principal/Participante/agenda']);
  }
}
