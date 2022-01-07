import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { take } from 'rxjs';
import { dataURLtoFile } from 'src/app/common/common';
import { UiService } from 'src/app/common/ui.service';
import { NameValidation } from 'src/app/common/validations';
import { Shop } from 'src/app/shops/shop';
import { SubSink } from 'subsink';
import { IProductData, ProductService } from '../product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  shop = new Shop();
  productForm!: FormGroup;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  image: any | undefined | null;

  imagePickerConf: ImagePickerConf = {
    borderRadius: '0px',
    language: 'en',
    width: '210px',
    height: '180px',
    hideDownloadBtn: true,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone,
    private uiService: UiService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

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
    this.buildForm();
    this.shop = this.route.snapshot.data['shop'];
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', NameValidation],
      description: ['', [Validators.minLength(10)]],
      quantity: ['', [Validators.min(1)]],
      price: ['', [Validators.min(0.01)]],
      category: ['', [Validators.minLength(3)]],
    });
  }

  createProduct(submittedForm: FormGroup) {
    let productData = submittedForm.value as IProductData;
    productData.file = this.image;
    this.productService.createProduct(this.shop._id, productData).subscribe({
      next: (res) => {
        this.router.navigate([`/shop/${this.shop._id}/edit`]);
      },
      error: (err) => this.uiService.showToast(err.message),
    });
  }
}
