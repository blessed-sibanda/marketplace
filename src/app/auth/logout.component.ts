import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { UiService } from '../common/ui.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: ` <p>Logging out...</p> `,
  styles: [],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.cartService.clearCart();
    this.uiService.showToast('You have logged out');
    this.router.navigate(['/']);
  }
}
