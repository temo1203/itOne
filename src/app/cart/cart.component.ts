import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any[] = [];
  cartNum: number = 0;
  constructor(private service: ApiServiceService, public http: HttpClient) {}

  ngOnInit(): void {
    this.service.getCartApi().subscribe({
      next: (data: any) => {
        this.cartData = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //! delete product
  deleteProduct(key: any) {
    const deleteUrl = `https://itstep-30100-default-rtdb.firebaseio.com/cart/${key}.json`;
    const confirmation = confirm('Are you sure you want to delete this item?');
    //? checks if prompt is clicked
    if (confirmation) {
      this.http.delete(deleteUrl).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  plus() {
    this.cartNum += 1;
  }
  minuse() {
    this.cartNum -= 1;
  }
}
