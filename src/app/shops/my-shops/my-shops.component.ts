import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/common/ui.service';
import { User } from 'src/app/user/user';
import { SubSink } from 'subsink';
import { Shop } from '../shop';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-my-shops',
  templateUrl: './my-shops.component.html',
  styleUrls: ['./my-shops.component.scss'],
})
export class MyShopsComponent implements OnInit {
  shops: Shop[] = [];
  subs = new SubSink();
  currentUser!: User;

  constructor(
    private shopService: ShopService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.shopService.listShopsByOwner(user._id).subscribe({
          next: (res) => {
            this.shops = res;
          },
          error: (err) => this.uiService.showToast(err.message),
        });
      },
    });
  }
}
