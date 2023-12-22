import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  cartNum: number = 0;
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
  private dataSubject = new BehaviorSubject<number>(0);
  public data$ = this.dataSubject.asObservable();

  updateData(newData: number) {
    this.dataSubject.next(newData);
  }
}
