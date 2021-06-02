import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategorycontainerComponent } from './containers/categorycontainer/categorycontainer.component';


@NgModule({
  declarations: [CategoriesComponent, CategoryFormComponent, CategorycontainerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
