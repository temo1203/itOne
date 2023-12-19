import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any[] = [];
  cartNum: number = 0;
  name: any;
  message: any;
  constructor(private service: ApiServiceService, public http: HttpClient) {}

  ngOnInit(): void {
    //! it retrieves products from api
    this.service.getCartApi().subscribe({
      next: (data: any) => {
        this.cartData = data || [];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //! delete product
  deleteProduct(key: any, id: any) {
    const deleteUrl = `https://itstep-30100-default-rtdb.firebaseio.com/cart/${key}.json`;

    // const confirmation = confirm('Are you sure you want to delete this item?');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your product has been deleted',
          showConfirmButton: false,
          timer: 1000,
        });
        this.http.delete(deleteUrl).subscribe({
          next: () => {
            console.log('Item deleted successfully');
            this.service.getCartApi().subscribe({
              next: (data: any) => {
                this.cartData = data || [];
              },
              error: (error) => {
                console.log(error);
              },
            });
            const updatedIndex = id - 1;

            this.http
              .put(
                `https://itstep-30100-default-rtdb.firebaseio.com/data/${updatedIndex}/cartBool.json`,
                false
              )
              .subscribe({
                next: (data) => {
                  console.log('cartBool updated successfully', data);
                },
                error: (error) => {
                  console.log('Error updating cartBool:', error);
                },
              });
          },
          error: (error) => {
            console.log('Error deleting item:', error);
          },
        });
      }
    });
    // if (confirmation) {
    //   this.http.delete(deleteUrl).subscribe({
    //     next: () => {
    //       console.log('Item deleted successfully');
    //       this.service.getCartApi().subscribe({
    //         next: (data: any) => {
    //           this.cartData = data || [];
    //         },
    //         error: (error) => {
    //           console.log(error);
    //         },
    //       });
    //       const updatedIndex = id - 1;

    //       this.http
    //         .put(
    //           `https://itstep-30100-default-rtdb.firebaseio.com/data/${updatedIndex}/cartBool.json`,
    //           false
    //         )
    //         .subscribe({
    //           next: (data) => {
    //             console.log('cartBool updated successfully', data);
    //           },
    //           error: (error) => {
    //             console.log('Error updating cartBool:', error);
    //           },
    //         });
    //     },
    //     error: (error) => {
    //       console.log('Error deleting item:', error);
    //     },
    //   });
    // }
  }

  //! plus function
  plus(id: any, ref: any) {
    // Retrieve the current value
    if (ref.value! > 9) {
      console.log('its more then 10');
    } else {
      this.http
        .get(
          `https://itstep-30100-default-rtdb.firebaseio.com/cart/${id}/cartNum.json`
        )
        .subscribe((currentValue: any) => {
          const newValue = currentValue + 1;

          this.http
            .put(
              `https://itstep-30100-default-rtdb.firebaseio.com/cart/${id}/cartNum.json`,
              newValue
            )
            .subscribe({
              next: (data) => {
                console.log('number:', data, 'was added');
              },
              error: (error) => {
                console.log(error);
              },
            });
        });
      ref.value++;
    }
  }

  //! minus function
  minus(id: any, ref: any) {
    if (ref.value < -1) {
      console.log('its less then 0');
    } else {
      this.http
        .get(
          `https://itstep-30100-default-rtdb.firebaseio.com/cart/${id}/cartNum.json`
        )
        .subscribe((currentValue: any) => {
          const newValue = currentValue - 1;

          this.http
            .put(
              `https://itstep-30100-default-rtdb.firebaseio.com/cart/${id}/cartNum.json`,
              newValue
            )
            .subscribe({
              next: (data) => {
                console.log('number:', data, 'was minused');
              },
              error: (error) => {
                console.log(error);
              },
            });
        });
      ref.value--;
    }
  }
}
