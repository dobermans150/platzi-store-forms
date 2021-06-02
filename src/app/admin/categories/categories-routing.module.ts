import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component'; 
import { CategorycontainerComponent } from './containers/categorycontainer/categorycontainer.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'create',
    component: CategorycontainerComponent
  },
  {
    path: 'edit/:id',
    component: CategorycontainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
