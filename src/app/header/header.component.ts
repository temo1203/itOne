import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isClassActive: boolean = false;

  toggleClass() {
    this.isClassActive = !this.isClassActive;
    console.log(this.isClassActive);
  }
}
