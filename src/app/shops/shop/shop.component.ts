import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../shop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  shop!: Shop;

  constructor(private route: ActivatedRoute, public media: MediaObserver) {}

  ngOnInit(): void {
    this.shop = this.route.snapshot.data['shop'];
  }
}
