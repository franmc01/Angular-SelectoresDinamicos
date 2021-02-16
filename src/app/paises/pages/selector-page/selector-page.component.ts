import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../models/pais.model';
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  formularioPais: FormGroup = this.fb.group({
    continente: ['', [Validators.required]],
    paises: ['', [Validators.required]],
    fronteras: ['', [Validators.required]]
  });

  //Llenar selectores
  continentes: string[] = [];
  paises: Pais[] = [];
  fronteras: string[] = [];

  constructor(private fb: FormBuilder,
    private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.continentes = this.paisesService.continentes;

    //Cuando cambio el primer combo
    // this.formularioPais.get('continente')?.valueChanges.subscribe(cont => {
    //   this.paisesService.obtenerPaises(cont).subscribe(paises => {
    //     this.paises = paises;
    //   });
    // });

    this.formularioPais.get('continente')?.valueChanges
      .pipe(
        tap((_) => {
          this.formularioPais.get('paises')?.reset('');
        }),
        switchMap(cont => this.paisesService.obtenerPaises(cont))
      )
      .subscribe(paises => {
        this.paises = paises;
      });


    this.formularioPais.get('paises')?.valueChanges
      .pipe(
        tap((_) => {
          this.fronteras= [];
          this.formularioPais.get('fronteras')?.reset('');
        }),
        switchMap(codigo => this.paisesService.obtenerPaisesPorCode(codigo))
      ).subscribe(pais => {
        this.fronteras = pais?.borders || [];
      })


  }

  guardar() {
    if (this.formularioPais.invalid) {
      return;
    }

    console.log(this.formularioPais.value);
  }

}
