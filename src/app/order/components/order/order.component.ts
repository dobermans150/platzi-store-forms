import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;
  form: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: this.formBuilder.array([])
    });
  }

  addAddressField(event){
    /* event.preventDefault(); */
    this.addressField.push(this.createAddressField())
  }

  save(){
    console.log(this.form.value);
  }

  private createAddressField(){
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['', [Validators.required]]
    })
  }

  get addressField(){
    return this.form.get('address') as FormArray;
  }
}
