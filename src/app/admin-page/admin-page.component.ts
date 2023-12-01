import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  api: string = 'https://itstep-30100-default-rtdb.firebaseio.com/data.json';
  selectedRating: number = 0;
  category: any;
  id: number = 0;
  form: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      desc: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
        ],
      ],
      price: ['', [Validators.required, Validators.maxLength(2)]],
      image: ['', Validators.required],
    });
  }

  onRatingChange(rating: number) {
    console.log(rating);
  }
  ngOnInit(): void {
    this.http.get(this.api).subscribe({
      next: (data) => {
        this.id = Object.keys(data).length + 1;
      },
    });
  }
  SubmitProduct() {
    this.http.get(this.api).subscribe({
      next: (data) => {
        this.id = Object.keys(data).length + 1;
      },
    });
    const newProduct = {
      description: this.fc.desc.value,
      title: this.fc.name.value,
      rating: {
        count: 120,
        rate: this.selectedRating,
      },
      cartBool: false,
      cartNum: 0,
      id: this.id,
      comments: [
        {
          desc: 'this product is very good',
          name: 'Temo',
          rate: 4.5,
        },
      ],

      category: this.category,
      image: this.fc.image.value,
      price: this.fc.price.value,
    };
    console.log(newProduct);
    this.http
      .post(
        `https://itstep-30100-default-rtdb.firebaseio.com/data/${
          this.id - 1
        }.json`,
        newProduct
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    //! Clear the form inputs and reset the rating
    // this.fc.desc.setValue('');
    // this.fc.name.setValue('');
    // this.fc.price.setValue('');
    // this.fc.image.setValue('');
    // this.selectedRating = 0;
  }
  get fc() {
    return this.form.controls;
  }
  onSelectionChange(event: any): void {
    this.category = event.value;
    console.log('Selected value:', this.category);
  }
}
