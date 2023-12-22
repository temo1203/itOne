import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartApi: string =
    'https://itstep-30100-default-rtdb.firebaseio.com/cart.json';
  isClass: boolean = false;
  cartData: any;
  random = [1, 2, 3, 4, 5];
  constructor(
    private router: Router,
    private service: ApiServiceService,
    private http: HttpClient,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.http.get(this.cartApi).subscribe({
      next: (data) => {
        this.cartData = Object.keys(data).length;
        this.service.data$.subscribe((data) => {
          this.cartData += data;
        });
        console.log(this.cartData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  toggleClass() {
    this.isClass = !this.isClass;
    console.log(this.isClass);
  }
  searchBar(value: any) {
    this.isClass = false;
    this.router.navigate(['/search'], {
      queryParams: {
        searchValue: value,
      },
    });
  }
  contactNav() {
    const fragment = 'contact';
    this.router.navigate(['/cart', { fragment }]).then(() => {
      setTimeout(() => {
        const currentScrollPosition = this.viewportScroller.getScrollPosition();
        const targetScrollPosition =
          currentScrollPosition[1] + window.innerHeight / 2;
        this.viewportScroller.scrollToPosition([0, targetScrollPosition]);
      }, 0);
    });
  }
}
