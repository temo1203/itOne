import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTag: string = '';
  products: any;
  productData: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTag = params['searchValue'];
      if (this.searchTag === '') {
        console.log('Error: Search tag is empty.');
        this.productData = [];
        this.searchTag = 'Uknown name';
      } else {
        console.log('Search tag is:', this.searchTag);

        this.service.GetProductApi().subscribe({
          next: (data: any) => {
            this.productData = data;
          },
          error: (error) => {
            console.log('Error fetching products:', error);
          },
        });
      }
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiServiceService
  ) {}
  productClick(id: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        productId: id,
      },
    });
  }
}
