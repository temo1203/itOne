import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartApi: string =
    'https://itstep-30100-default-rtdb.firebaseio.com/cart.json';
  isClass: any;
  cartData: any;
  random = [1, 2, 3, 4, 5];
  constructor(
    private router: Router,
    private service: ApiServiceService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.http.get(this.cartApi).subscribe({
      next: (data) => {
        this.cartData = Object.keys(data).length;
        console.log(this.cartData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  toggleClass() {
    this.service.isClassActive = !this.service.isClassActive;
    this.isClass = this.service.isClassActive;
    console.log(this.service.isClassActive);
  }
  searchBar(value: any) {
    this.router.navigate(['/search'], {
      queryParams: {
        searchValue: value,
      },
    });
  }
}
