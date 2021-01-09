import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDetailsComponent } from './components/component-details/component-details.component';

const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: '',
        component: ComponentDetailsComponent,
      },
      {
        path: ':id',
        component: ComponentDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
