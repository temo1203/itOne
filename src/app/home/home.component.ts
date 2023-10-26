import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ApiServiceService, private router: Router) {}
  searchBar = ["men's clothing", 'jewelery', 'electronics', "women's clothing"];
  asideSearchBar = [
    'Power tools and equipment for the garden',
    'Construction, measurement and cleaning',
    'Hand tools and equipment',
    'Auto electronics and antitheft systems',
    'car audio',
    'Outdoor and interior',
  ];
  variable: number = 3;
  productData: any;
  ngOnInit(): void {
    this.service.GetProductApi().subscribe({
      next: (data) => {
        const productArray = Object.values(data);
        this.productData = [];
        const numProducts = 6;

        for (let i = 0; i < numProducts; i++) {
          const randomIndex = Math.floor(Math.random() * productArray.length);
          const randomProduct = productArray[randomIndex];

          this.productData.push(randomProduct);

          productArray.splice(randomIndex, 1);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  productClick(id: any, image: string, name: string, price: number) {
    this.router.navigate(['/products'], {
      queryParams: {
        productId: id,
        productImage: image,
        productName: name,
        productPrice: price,
      },
    });
  }
  navigateToFilters(index: number) {
    const selectedValue = this.searchBar[index];
    this.router.navigate(['/filters'], {
      queryParams: { value: selectedValue },
    });
  }
}
