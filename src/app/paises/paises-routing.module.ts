import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selectores',
        component: SelectorPageComponent
      },
      {
        path: '**',
        redirectTo: 'selectores'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
