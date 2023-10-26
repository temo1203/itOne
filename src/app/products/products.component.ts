import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  popBool: boolean = false;
  id: any = '';
  img: string = '';
  name: string = '';
  price: any = '';
  form: any;
  var: any = 'comments';
  nameRegex = /^[a-z\-]+$/;
  ngOnInit(): void {}
  constructor(
    private service: ApiServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['productId'];
      this.img = params['productImage'];
      this.name = params['productName'];
      this.price = params['productPrice'];
      // console.log(this.id, this.name, this.price, this.img);
    });
    this.form = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(this.nameRegex),
        ],
      ],
      textarea: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  stars: string[] = ['star', 'star', 'star', 'star', 'star'];
  selectedRating: number = 0;

  setRating(rating: any) {
    this.selectedRating = rating;
  }
  SubmitForm() {
    console.log(this.form.value);
    this.popBool = false;
  }
  openPop() {
    this.popBool = true;
  }
  closePop() {
    this.popBool = false;
  }
  get fc() {
    return this.form.controls;
  }
}
