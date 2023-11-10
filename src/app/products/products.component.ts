import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
import { noSpace } from '../nospace.validators';
import swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //> Rating stars
  selectedRating: number = 0;

  onRatingChange(rating: number) {
    this.selectedRating = rating;
    console.log(rating);
  }

  //> Product details
  commentsData: any[] = [];
  popBool: boolean = false;
  id: any = '';
  form: any;
  productsData: any = [];
  nameRegex = /.*[A-Z].*/;
  cartBoolean: string = '';

  ngOnInit(): void {
    //! Fetch product data
    this.http
      .get(
        `https://itstep-30100-default-rtdb.firebaseio.com/data/${
          this.id - 1
        }.json`
      )
      .subscribe({
        next: (data) => {
          this.productsData = data;
          if (this.productsData?.cartBool === false) {
            this.cartBoolean = 'კალათაში დამატება';
          } else {
            this.cartBoolean = 'დამატებულია';
          }
          this.commentsData = this.productsData?.comments || [];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  constructor(
    private service: ApiServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    //! Fetch route parameters
    this.route.queryParams.subscribe((params: any) => {
      this.id = params['productId'];
    });

    //! Initialize form controls
    this.form = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern(this.nameRegex),
          noSpace,
        ],
      ],
      textarea: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  //! Submit review form
  SubmitForm() {
    const newComment = {
      desc: this.fc.textarea.value,
      name: this.fc.name.value,
      rate: this.selectedRating,
    };

    //! Post the new comment
    this.http
      .post(
        `https://itstep-30100-default-rtdb.firebaseio.com/data/${
          this.id - 1
        }/comments.json`,
        newComment
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });

    //! Clear the form inputs and reset the rating
    this.fc.textarea.setValue('');
    this.fc.name.setValue('');
    this.selectedRating = 0;
    this.closePop();
  }

  //! Add to cart
  cartAdd() {
    if (this.cartBoolean == 'კალათაში დამატება') {
      //! Update cartBool in Firebase
      this.http
        .put(
          `https://itstep-30100-default-rtdb.firebaseio.com/data/${
            this.id - 1
          }/cartBool.json`,
          true
        )
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });

      //! Add product to the cart
      this.cartBoolean = 'დამატებულია';
      this.http.post(this.service.cartApi, this.productsData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      swal.fire('შეცდომა', 'პროდუქტი უკვე არის დამატებული!', 'error');
    }
  }

  //! Open review pop-up
  openPop() {
    this.popBool = true;
  }

  //! Close review pop-up
  closePop() {
    this.popBool = false;
  }

  //! Get form controls
  get fc() {
    return this.form.controls;
  }
}
