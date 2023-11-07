import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ApiServiceService, private router: Router) {}

  //> Search bar items
  searchBar = ["Men's clothing", 'Jewelry', 'Electronics', "Women's clothing"];

  //> Aside search bar items
  asideSearchBar = [
    'Power tools and equipment for the garden',
    'Construction, measurement, and cleaning',
    'Hand tools and equipment',
    'Auto electronics and antitheft systems',
    'Car audio',
    'Outdoor and interior',
  ];

  //> A variable for demonstration
  variable: number = 3;

  //> Holds product data
  productData: any;

  ngOnInit(): void {
    //! Fetch product data
    this.service.GetProductApi().subscribe({
      next: (data) => {
        //? Convert data to an array
        const productArray = Object.values(data);

        this.productData = [];
        const numProducts = 6;

        for (let i = 0; i < numProducts; i++) {
          //? Select a random product
          const randomIndex = Math.floor(Math.random() * productArray.length);
          const randomProduct = productArray[randomIndex];

          this.productData.push(randomProduct);

          //? Remove the selected product to avoid duplication
          productArray.splice(randomIndex, 1);
        }
      },
      error: (error) => {
        console.error('Error fetching product data:', error);
      },
    });
  }

  //! Handle product click
  productClick(id: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        productId: id,
      },
    });
  }

  //! Navigate to filters page with selected value
  navigateToFilters(index: number) {
    const selectedValue = this.searchBar[index];
    this.router.navigate(['/filters'], {
      queryParams: { value: selectedValue },
    });
  }
}
