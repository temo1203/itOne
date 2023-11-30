import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiServiceService } from './api-service.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // @ViewChild(HeaderComponent) HeaderComponent: HeaderComponent;
  constructor(private router: Router, private service: ApiServiceService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to: ', event.url);
        this.service.isClassActive = false;
        console.log(this.service.isClassActive);
      }
    });
  }
}
