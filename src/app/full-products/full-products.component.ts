import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-full-products',
  templateUrl: './full-products.component.html',
  styleUrls: ['./full-products.component.css'],
})
export class FullProductsComponent {
  constructor(private service: ApiServiceService, private router: Router) {}

  //> Search bar items
  searchBar = ["men's clothing", 'jewelery', 'electronics', "women's clothing"];

  //> Flag to indicate if there are no matching products
  noMatchingProducts: boolean = false;

  //> A variable for demonstration
  variable: number = 3;

  //> Holds product data
  productData: any;

  //> Price range filters
  minPrice: number = 0;
  maxPrice: number = 500;

  //> Filtered product data
  productFilterData: any[] = [];

  //> Selected categories for filtering
  selectedCategories: string[] = [];

  //> Aside search bar items
  asideSearchBar = [
    'Power tools and equipment for the garden',
    'Construction, measurement and cleaning',
    'Hand tools and equipment',
    'Auto electronics and antitheft systems',
    'car audio',
    'Outdoor and interior',
  ];

  ngOnInit(): void {
    swal.fire('გილოცავთ', 'პროდუქტი წარმატებით დაემატა cart-ში!', 'success');
    //! Fetch product data
    this.service.GetProductApi().subscribe({
      next: (data) => {
        //? Convert data to an array
        const productArray = Object.values(data);

        this.productData = [];
        const numProducts = 18;

        for (let i = 0; i < numProducts; i++) {
          //? Select a random product
          const randomIndex = Math.floor(Math.random() * productArray.length);
          const randomProduct = productArray[randomIndex];

          this.productData.push(randomProduct);
          this.productFilterData.push(randomProduct);

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

  //! Toggle selected category filters
  applyFilters(value: any) {
    if (this.selectedCategories.includes(value)) {
      const index = this.selectedCategories.indexOf(value);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    } else {
      this.selectedCategories.push(value);
    }
  }

  //! Filter products based on selected categories and price range
  filterProducts() {
    this.productData = this.productFilterData.filter((product) => {
      const isCategorySelected =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);
      const isPriceInRange =
        product.price >= this.minPrice && product.price <= this.maxPrice;
      return isCategorySelected && isPriceInRange;
    });

    //? Check if there are no matching products
    this.noMatchingProducts = this.productData.length === 0;
  }
}
