import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbcComponent } from '../../components/abc/abc.component';

const routes: Routes = [
  {
    path: '',
    component: AbcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbcRoutingModule { }
