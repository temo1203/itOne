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
      this.service.GetProductApi().subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
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
