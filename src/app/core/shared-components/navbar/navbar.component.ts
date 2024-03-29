import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public menuItems = [
    {
      title: 'Home',
      routerLink: '/home',
    },
    {
      title: 'Stores',
      routerLink: 'dashboard/store',
    },
  ];

  constructor() {}
}
