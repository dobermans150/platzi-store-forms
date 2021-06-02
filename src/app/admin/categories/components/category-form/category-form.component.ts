import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { CategoriesService } from './../../../../core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (this.categoryId) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    this.categoriesService
      .createCategory(this.form.value)
      .subscribe((value) => {
        console.log(value);
        this.router.navigate(['./admin/categories']);
      });
  }

  private getCategory() {
    this.categoriesService
      .getCatergory(this.categoryId)
      .subscribe((category: Category) => {
        const { image, name } = category;
        this.form.patchValue({ name, image });
      });
  }

  private updateCategory() {
    const categoryUpdated = this.form.value;
    this.categoriesService
      .updateCategory(this.categoryId, categoryUpdated)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['./admin/categories']);
      });
  }

  uploadFile(event) {
    const image = event.target.files[0];
    const name = `${uuidv4()}.png`;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage = ref.getDownloadURL();
          urlImage.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }
}
