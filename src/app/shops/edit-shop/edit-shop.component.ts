import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { take } from 'rxjs';
import { dataURLtoFile } from 'src/app/common/common';
import { UiService } from 'src/app/common/ui.service';
import { NameValidation } from 'src/app/common/validations';
import { SubSink } from 'subsink';
import { Shop } from '../shop';
import { IShopData, ShopService } from '../shop.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit, OnDestroy {
  shop!: Shop;
  shopForm!: FormGroup;
  subs = new SubSink();
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  image: any | undefined | null;

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private uiService: UiService
  ) {}

  imagePickerConf: ImagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '150px',
    height: '150px',
    hideDownloadBtn: true,
  };

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
    let courseData = submittedForm.value as IShopData;

    courseData.file = this.image;
    this.subs.add(
      this.shopService.updateShop(this.shop._id, courseData).subscribe({
        next: (res) => {
          this.uiService.showToast('Shop updated successfully!');
        },
        error: (err) => this.uiService.showToast(err.message),
      })
    );
  }

  syncData() {
    this.subs.add(
      this.route.params.subscribe({
        next: (params) => {
          this.shopService.getShop(params['shopId']).subscribe({
            next: (res) => {
              this.shop = res;
              this.buildForm();
            },
          });
        },
      })
    );
  }
}
