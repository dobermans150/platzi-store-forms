import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { CategoriesService } from './../../../../core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

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
      this.categoriesService
        .createCategory(this.form.value)
        .subscribe((value) => {
          console.log(value);
          this.router.navigate(['./admin/categories']);
        });
    }
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

  private createCategory() {}
}
