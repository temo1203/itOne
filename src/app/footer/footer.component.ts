import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router: Router) {}
  searchBar = ["Men's clothing", 'Jewelry', 'Electronics', "Women's clothing"];
  navigateToFilters(index: number) {
    const selectedValue = this.searchBar[index];
    this.router.navigate(['/filters'], {
      queryParams: { value: selectedValue },
    });
  }
}
