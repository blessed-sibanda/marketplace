import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SubSink } from 'subsink';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';
import { SideNavigationService } from './core/side-navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('sidenav') public sideNav!: MatSidenav;
  subs = new SubSink();
  cartCount = 0;

  constructor(
    public media: MediaObserver,
    public sideNavService: SideNavigationService,
    public authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.cartService.items$.subscribe({
      next: (items) => (this.cartCount = this.cartService.count),
    });
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSideNav(this.sideNav);
  }
}
