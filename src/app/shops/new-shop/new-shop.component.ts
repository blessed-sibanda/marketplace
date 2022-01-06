import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { take } from 'rxjs';
import { dataURLtoFile } from 'src/app/common/common';
import { UiService } from 'src/app/common/ui.service';
import { NameValidation } from 'src/app/common/validations';
import { SubSink } from 'subsink';
import { IShopData, ShopService } from '../shop.service';

@Component({
  selector: 'app-new-shop',
  templateUrl: './new-shop.component.html',
  styleUrls: ['./new-shop.component.scss'],
})
export class NewShopComponent implements OnInit, OnDestroy {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  image: any | undefined | null;
  subs = new SubSink();
  shopForm!: FormGroup;

  imagePickerConf: ImagePickerConf = {
    borderRadius: '0px',
    language: 'en',
    width: '210px',
    height: '180px',
    hideDownloadBtn: true,
  };

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone,
    private router: Router,
    private uiService: UiService
  ) {}

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
  }

  buildForm() {
    this.shopForm = this.formBuilder.group({
      name: ['', NameValidation],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createShop(submittedForm: FormGroup) {
    let shopData = submittedForm.value as IShopData;
    if (!this.image) {
      this.uiService.showToast('Shop image is required');
      return;
    }
    shopData.file = this.image;
    this.subs.sink = this.shopService.createShop(shopData).subscribe({
      next: (res) => {
        this.router.navigate(['/my-shops']);
      },
      error: (err) => this.uiService.showToast(err.message),
    });
  }
}
