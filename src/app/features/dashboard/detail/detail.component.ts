import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from 'src/app/core/models/Product';
import { finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DialogBoxComponent } from 'src/app/core/shared-components/dialog-box/dialog-box.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AddItemComponent } from '../../add-item/add-item.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  storeID;
  productID;

  itemDetail;
  itemList: Product[] = [];
  listType;
  detailType;

  storeCharts = [];

  constructor(
    private _storeService: StoreService,
    private _activeRoute: ActivatedRoute,
    private _coreService: CoreService,
    private _location: Location
  ) {}

  ngOnInit() {
    this._coreService.showLoading();
    this.storeID = this._activeRoute.snapshot.params['storeID'];
    //check if it is a product or a store
    if ('productID' in this._activeRoute.snapshot.params) {
      this.detailType = 'product';
      this.productID = this._activeRoute.snapshot.params['productID'];

      this._storeService
        .getProductById(this.storeID, this.productID)
        .subscribe((product: Product) => {
          this.itemDetail = product;
        });
    } else if ('storeID' in this._activeRoute.snapshot.params) {
      this.detailType = 'store';
      this.listType = 'product';

      const products$ = this._storeService.getProductsByStore(this.storeID);
      const store$ = this._storeService.getStoreById(this.storeID);
      const charts$ = this._storeService.getChartByStore(this.storeID);

      //merge multiple call
      forkJoin([products$, store$, charts$]).subscribe(
        ([products, store, charts]) => {
          this.itemList = [...products];
          this.itemDetail = store;
          this.storeCharts = [...charts];
          this._coreService.hideLoading();
        }
      );
    }
  }

  eventHandler(event) {
    if (event && event.status == 'delete' && event.itemType == 'product')
      this.deleteProduct(event.item);

    if (event && event.status == 'create' && event.itemType == 'product')
      this.createProduct();
  }

  deleteProduct(product: Product) {
    const dialogConfig: MatDialogConfig = {
      data: {
        message: 'Eliminare Prodotto?',
        description:
          'Il prodotto verrà rimosso definitivamente, sei sicuro di procedere?',
        actionButton: 'delete',
      },
    };

    let dialog = this._coreService.openDialog(DialogBoxComponent, dialogConfig);
    dialog.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this._storeService
          .deleteProductById(this.storeID, product['id'])
          .pipe(
            switchMap(() => {
              return this._storeService.getProductsByStore(this.storeID);
            })
          )
          .subscribe({
            next: (products) => {
              this.itemList = [...products];
            },
          });
      }
    });
  }

  createProduct() {
    const dialogConfig: MatDialogConfig = {
      data: {
        storeID: this.storeID,
      },
    };
    let dialog = this._coreService.openDialog(AddItemComponent, dialogConfig);
    dialog.afterClosed().subscribe((result) => {
      if (result && result.status == 'success') {
        this._coreService.goTo(
          `dashboard/store/${this.storeID}/products/${result.idResult}`
        );
      }
    });
  }

  //ui utils
  goBack() {
    this._location.back();
  }
}
