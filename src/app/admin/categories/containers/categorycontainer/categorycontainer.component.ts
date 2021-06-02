import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categorycontainer',
  templateUrl: './categorycontainer.component.html',
  styleUrls: ['./categorycontainer.component.scss'],
})
export class CategorycontainerComponent implements OnInit {
  category: Category;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const categoryId = params.id;
      if (categoryId) {
        this.getCategory(categoryId);
      }
    });
  }

  createCategory(data) {
    this.categoriesService.createCategory(data).subscribe((value) => {
      console.log(value);
      this.router.navigate(['./admin/categories']);
    });
  }

  private getCategory(id) {
    this.categoriesService.getCatergory(id).subscribe((category: Category) => {
      this.category = category;
      console.log(this.category);

    });
  }

  updateCategory(data) {
    this.categoriesService
      .updateCategory(this.category._id, data)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['./admin/categories']);
      });
  }
}
