import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { take } from 'rxjs';
import { dataURLtoFile } from 'src/app/common/common';
import { UiService } from 'src/app/common/ui.service';
import { NameValidation } from 'src/app/common/validations';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { Shop } from '../shop';
import { IShopData, ShopService } from '../shop.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit {
  shop = new Shop();
  shopForm!: FormGroup;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  image: any | undefined | null;
  products: Product[] = [];

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private uiService: UiService,
    private productService: ProductService
  ) {}

  imagePickerConf: ImagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '150px',
    height: '150px',
    hideDownloadBtn: true,
  };

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onImageChange(event: any) {
    let filename = `${Date.now()}${Math.floor(Math.random() * Date.now())}`;
    this.image = dataURLtoFile(event, filename);
  }

  ngOnInit(): void {
    this.syncData();
    this.buildForm();
  }

  buildForm() {
    this.shopForm = this.formBuilder.group({
      name: [this.shop?.name, NameValidation],
      description: [
        this.shop?.description,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  updateShop(submittedForm: FormGroup) {
    let shopData = submittedForm.value as IShopData;

    shopData.file = this.image;

    this.shopService.updateShop(this.shop._id, shopData).subscribe({
      next: (res) => {
        this.uiService.showToast('Shop updated successfully!');
      },
      error: (err) => this.uiService.showToast(err.message),
    });
  }

  syncData() {
    this.shop = this.route.snapshot.data['shop'];
    this.buildForm();
    this.productService
      .listProductsByShop(this.shop._id)
      .subscribe({ next: (res) => (this.products = res) });
  }
}
