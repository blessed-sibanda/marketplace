import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { transformError } from '../common/common';
import { IShop, Shop } from './shop';

export interface IShopData {
  name: string;
  description: string;
  file?: File;
}

interface IShopService {
  createShop(data: IShopData): Observable<Shop>;
  listShopsByOwner(userId: string): Observable<Shop[]>;
  listShops(): Observable<Shop[]>;
  getShop(shopId: string): Observable<Shop>;
  updateShop(shopId: string, data: IShopData): Observable<Shop>;
}

@Injectable({
  providedIn: 'root',
})
export class ShopService implements IShopService {
  constructor(private httpClient: HttpClient) {}

  updateShop(shopId: string, data: IShopData): Observable<Shop> {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    data.file && formData.append('file', data.file);

    return this.httpClient
      .put<IShop>(`${environment.baseApiUrl}/shops/${shopId}`, data)
      .pipe(map(Shop.Build), catchError(transformError));
  }

  getShop(shopId: string): Observable<Shop> {
    return this.httpClient
      .get<IShop>(`${environment.baseApiUrl}/shops/${shopId}`)
      .pipe(map(Shop.Build), catchError(transformError));
  }

  listShops(): Observable<Shop[]> {
    return this.httpClient
      .get<IShop[]>(`${environment.baseApiUrl}/shops`)
      .pipe(map(Shop.BuildMany), catchError(transformError));
  }

  listShopsByOwner(userId: string): Observable<Shop[]> {
    return this.httpClient
      .get<IShop[]>(`${environment.baseApiUrl}/shops/user/${userId}`)
      .pipe(map(Shop.BuildMany), catchError(transformError));
  }

  createShop(data: IShopData): Observable<Shop> {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    data.file && formData.append('file', data.file);

    return this.httpClient
      .post<IShop>(`${environment.baseApiUrl}/shops`, formData)
      .pipe(map(Shop.Build), catchError(transformError));
  }
}
