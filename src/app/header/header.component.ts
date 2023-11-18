import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  isClassActive: boolean = false;

  toggleClass() {
    this.isClassActive = !this.isClassActive;
    console.log(this.isClassActive);
  }
  searchBar(value: any) {
    this.router.navigate(['/search'], {
      queryParams: {
        searchValue: value,
      },
    });
  }
}
