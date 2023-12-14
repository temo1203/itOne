import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
import { noSpace } from '../nospace.validators';
import Swal from 'sweetalert2';
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ეს პროდუქტი უკვე დამატებულია!',
      });
    }
  }

  //! Open review pop-up
  openPop() {
    // this.popBool = true;
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html: this.createModalContent(),
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes',
        preConfirm: () => {
          // Retrieve the values of the input fields
          return {
            val1: (document.getElementById('swal-input1') as HTMLInputElement)
              .value,
            val2: (document.getElementById('swal-input2') as HTMLInputElement)
              .value,
          };
        },
      });

      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
        console.log(JSON.stringify(formValues));
      } else {
        // Handle cancel or close actions if needed
      }
    })();
  }

  //! Close review pop-up
  closePop() {
    this.popBool = false;
  }

  //! Get form controls
  get fc() {
    return this.form.controls;
  }
  createModalContent(): string {
    return `
      <div>
        <!-- Input fields -->
        <input [(ngModel)]="formValues.val1" name="swal-input1" class="swal2-input">
        <input [(ngModel)]="formValues.val2" name="swal-input2" class="swal2-input">

        <!-- Star rating -->
        <div class="rating">
          <input [(ngModel)]="selectedRating" name="rate" id="star5" type="radio" value="5" (change)="onRatingChange(5)" />
          <label title="text" for="star5"></label>
          <input [(ngModel)]="selectedRating" name="rate" id="star4" type="radio" value="4" (change)="onRatingChange(4)" />
          <label title="text" for="star4"></label>
          <input [(ngModel)]="selectedRating" name="rate" id="star3" type="radio" value="3" (change)="onRatingChange(3)" />
          <label title="text" for="star3"></label>
          <input [(ngModel)]="selectedRating" name="rate" id="star2" type="radio" value="2" (change)="onRatingChange(2)" />
          <label title="text" for="star2"></label>
          <input [(ngModel)]="selectedRating" name="rate" id="star1" type="radio" value="1" (change)="onRatingChange(1)" />
          <label title="text" for="star1"></label>
        </div>
      </div>
    `;
  }
}
