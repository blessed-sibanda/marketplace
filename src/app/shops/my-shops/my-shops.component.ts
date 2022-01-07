import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/common/ui.service';
import { User } from 'src/app/user/user';
import { SubSink } from 'subsink';
import { IShop, Shop } from '../shop';
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

  deleteShop(shop: Shop) {
    const dialog = this.uiService.showDialog(
      'Delete Shop',
      `Confirm to delete shop: '${shop.name}'`,
      'Confirm',
      'Cancel'
    );
    this.subs.sink = dialog.subscribe((result) => {
      if (result) {
        this.shopService.deleteShop(shop._id).subscribe({
          next: () => {
            this.uiService.showToast('Shop deleted successfully');
            this.shops = this.shops.filter((s) => s._id != shop._id);
          },
          error: (err) => this.uiService.showToast(err.message),
        });
      }
    });
  }
}
