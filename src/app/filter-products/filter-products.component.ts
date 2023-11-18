import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css'],
})
export class FilterProductsComponent implements OnInit {
  filterTag: string = '';
  products: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const filterValue = params['value'];
      if (filterValue) {
        this.filterTag = filterValue;
        this.service.GetProductApi().subscribe({
          next: (data) => {
            const productArray = Object.values(data);

            this.productData = productArray.filter((product) => {
              return (
                product.category.toLowerCase() == filterValue.toLowerCase()
              );
            });
            console.log(this.productData);
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.service.GetProductApi().subscribe({
          next: (data) => {
            this.productData = Object.values(data).slice(0, 18);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  constructor(
    private service: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  productData: any;
  productClick(id: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        productId: id,
      },
    });
  }
}
