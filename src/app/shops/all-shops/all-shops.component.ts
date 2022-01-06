import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Shop } from '../shop';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.scss'],
})
export class AllShopsComponent implements OnInit {
  subs = new SubSink();
  shops: Shop[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.subs.sink = this.shopService
      .listShops()
      .subscribe({ next: (res) => (this.shops = res) });
  }
}
