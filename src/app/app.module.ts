import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SideNavigationComponent } from './core/side-navigation/side-navigation.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { AuthService } from './auth/auth.service';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { authFactory } from './auth/auth.factory';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ShopsModule } from './shops/shops.module';
import { SuggestionsComponent } from './products/suggestions/suggestions.component';
import { ProductComponent } from './products/product/product.component';
import { SearchComponent } from './products/search/search.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShopComponent } from './shops/shop/shop.component';
import { CartModule } from './cart/cart.module';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SideNavigationComponent,
    SignUpComponent,
    SimpleDialogComponent,
    SuggestionsComponent,
    ProductComponent,
    SearchComponent,
    ProductListComponent,
    ShopComponent,
    AddToCartComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    AuthModule,
    UserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    ShopsModule,
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true, hasBackdrop: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
