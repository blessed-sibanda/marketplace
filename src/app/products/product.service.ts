import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
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

export interface IProductQuery {
  search?: string;
  category?: string;
}

interface IProductService {
  products$: BehaviorSubject<Product[]>;
  categoryProducts$: BehaviorSubject<Product[]>;
  createProduct(shopId: string, data: IProductData): Observable<Product>;
  updateProduct(
    shopId: string,
    productId: string,
    data: IProductData
  ): Observable<Product>;
  deleteProduct(shopId: string, productId: string): Observable<void>;
  getProduct(productId: string): Observable<Product>;
  listProductsByShop(shopId: string): Observable<Product[]>;
  latestProducts(): Observable<Product[]>;
  relatedProducts(productId: string): Observable<Product[]>;
  listCategories(): Observable<string[]>;
  searchProducts(query: IProductQuery): Observable<Product[]>;
  listProductsByCategory(category: string): Observable<Product[]>;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService implements IProductService {
  constructor(private httpClient: HttpClient) {}

  categoryProducts$ = new BehaviorSubject<Product[]>([]);

  listProductsByCategory(category: string): Observable<Product[]> {
    const params = new HttpParams().set('category', category);

    return this.httpClient
      .get<IProduct[]>(`${environment.baseApiUrl}/products`, { params })
      .pipe(map(Product.BuildMany), catchError(transformError));
  }

  products$ = new BehaviorSubject<Product[]>([]);

  searchProducts(query: IProductQuery): Observable<Product[]> {
    const params = new HttpParams()
      .set('search', query.search ?? '')
      .set('category', query.category ?? '');

    return this.httpClient
      .get<IProduct[]>(`${environment.baseApiUrl}/products`, { params })
      .pipe(map(Product.BuildMany), catchError(transformError));
  }

  listCategories(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`${environment.baseApiUrl}/products/categories`)
      .pipe(catchError(transformError));
  }

  deleteProduct(shopId: string, productId: string): Observable<void> {
    return this.httpClient
      .delete<void>(
        `${environment.baseApiUrl}/products/${shopId}/product/${productId}`
      )
      .pipe(catchError(transformError));
  }

  updateProduct(
    shopId: string,
    productId: string,
    data: IProductData
  ): Observable<Product> {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    data.file && formData.append('file', data.file);

    return this.httpClient
      .put<IProduct>(
        `${environment.baseApiUrl}/products/${shopId}/product/${productId}`,
        formData
      )
      .pipe(map(Product.Build), catchError(transformError));
  }

  getProduct(productId: string): Observable<Product> {
    return this.httpClient
      .get<IProduct>(`${environment.baseApiUrl}/products/product/${productId}`)
      .pipe(map(Product.Build), catchError(transformError));
  }

  latestProducts(): Observable<Product[]> {
    return this.httpClient
      .get<IProduct[]>(`${environment.baseApiUrl}/products/latest`)
      .pipe(map(Product.BuildMany), catchError(transformError));
  }

  relatedProducts(productId: string): Observable<Product[]> {
    return this.httpClient
      .get<IProduct[]>(
        `${environment.baseApiUrl}/products/related/${productId}`
      )
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
