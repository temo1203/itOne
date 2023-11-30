import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  isClassActive: boolean = false;
  //> Define API endpoints
  api: string = 'https://itstep-30100-default-rtdb.firebaseio.com/data.json';
  cartApi: string =
    'https://itstep-30100-default-rtdb.firebaseio.com/cart.json';

  constructor(private http: HttpClient) {}

  //! Fetch product data
  GetProductApi() {
    return this.http.get(this.api);
  }

  //! Fetch cart data
  getCartApi() {
    return this.http.get(this.cartApi);
  }
}
