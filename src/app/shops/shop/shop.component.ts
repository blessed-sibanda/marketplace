import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Shop } from '../shop';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  shop!: Shop;
  subs = new SubSink();

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    public media: MediaObserver
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe((p) => {
        this.shopService
          .getShop(p['shopId'])
          .subscribe({ next: (res) => (this.shop = res) });
      })
    );
  }
}
