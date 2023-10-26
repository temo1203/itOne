import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  api: string = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}
  GetProductApi() {
    return this.http.get(this.api);
  }
  PostProduct(string: string) {
    return this.http.post(this.api, string);
  }
}
