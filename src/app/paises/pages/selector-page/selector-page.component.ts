import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  formularioPais: FormGroup = this.fb.group({
    continente: ['', [Validators.required]]
  });

  //Llenar selectores
  continentes: string[] = [];

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.continentes = this.paisesService.continentes;


  }

  guardar(){
    if(this.formularioPais.invalid){
      return;
    }

    console.log(this.formularioPais.value);
  }

}
