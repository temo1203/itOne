import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isClass: any;
  constructor(private router: Router, private service: ApiServiceService) {}
  random = [1, 2, 3, 4, 5];
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
