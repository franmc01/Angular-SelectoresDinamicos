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
  // fronteras: string[] = [];
  fronteras: Pais[] = [];


  // UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.continentes = this.paisesService.continentes;
    // this.formularioPais.get('paises')?.disable();
    // this.formularioPais.get('fronteras')?.disable();


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
          this.cargando = true;
        }),
        switchMap(cont => this.paisesService.obtenerPaises(cont))
      )
      .subscribe(paises => {
        // if(paises !== null){
        //   this.formularioPais.get('paises')?.enable();
        // }
        this.paises = paises;
        this.cargando = false;
      });


    this.formularioPais.get('paises')?.valueChanges
      .pipe(
        tap((_) => {
          this.fronteras = [];
          this.formularioPais.get('fronteras')?.reset('');
          this.cargando = true;
        }),
        switchMap(codigo => this.paisesService.obtenerPaisesPorCode(codigo)),
        switchMap(pais => this.paisesService.getPaisesPorCodigosFronteras(pais?.borders!))
      ).subscribe(paisesM => {
        // if(pais?.borders.length !== 0){
        //   this.formularioPais.get('fronteras')?.enable();
        // }
          this.fronteras = paisesM;
          this.cargando = false;
      })


  }

  guardar() {
    if (this.formularioPais.invalid) {
      return;
    }

    console.log(this.formularioPais.value);
  }

}
