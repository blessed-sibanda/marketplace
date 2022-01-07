import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { transformError } from '../common/common';
import { IProduct, Product } from './product';

export interface IProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  file?: File;
}

interface IProductService {
  createProduct(shopId: string, data: IProductData): Observable<Product>;
  listProductsByShop(shopId: string): Observable<Product[]>;
  latestProducts(): Observable<Product[]>;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService implements IProductService {
  constructor(private httpClient: HttpClient) {}

  latestProducts(): Observable<Product[]> {
    return this.httpClient
      .get<IProduct[]>(`${environment.baseApiUrl}/products/latest`)
      .pipe(map(Product.BuildMany), catchError(transformError));
  }

  listProductsByShop(shopId: string): Observable<Product[]> {
    return this.httpClient
      .get<IProduct[]>(`${environment.baseApiUrl}/products/${shopId}`)
      .pipe(map(Product.BuildMany), catchError(transformError));
  }

  createProduct(shopId: string, data: IProductData): Observable<Product> {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    data.file && formData.append('file', data.file);

    return this.httpClient
      .post<IProduct>(`${environment.baseApiUrl}/products/${shopId}`, formData)
      .pipe(map(Product.Build), catchError(transformError));
  }
}
