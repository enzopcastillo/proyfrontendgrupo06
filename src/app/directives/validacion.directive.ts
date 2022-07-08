import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

/* VERIFICAR CARACTER ESPECIAL */
function verificarCaracterEspecial(c:AbstractControl){
  if (c.value == null) return null;
  if(/^[a-zA-Z0-9 ]*$/.test(c.value) == false){
    return {verificarCaracterEspecial: true}
  }
  return null;
} 

@Directive({
  selector: '[verificar-caracter-especial]',
  providers:[
    {provide: NG_VALIDATORS, multi: true, useValue:verificarCaracterEspecial}
  ]
})

export class VerificarCaracterEspecial {
  constructor() {}
}

/* VERIFICAR PRIMERA LETRA MAYUSCULA */
function verificarPrimeraLetra(c:AbstractControl){
  let texto:string = String(c.value);
  if (texto == null) { return null}
  if (texto.charAt(0) != texto.charAt(0).toUpperCase()){
    return {verificarPrimeraLetra: true}
  }
  return null;
} 

@Directive({
  selector: '[verificar-primera-letra]',
  providers:[
    {provide: NG_VALIDATORS, multi: true, useValue:verificarPrimeraLetra}
  ]
})

export class VerificarPrimeraLetra {
  constructor() {}
}

/* POR DEFECTO */
@Directive({
  selector: '[appValidacion]'
})

export class ValidacionDirective {
  constructor() {}
}
