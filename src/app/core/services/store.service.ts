import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  finalize,
  map,
  tap,
  throwError,
} from 'rxjs';
import Product from 'src/app/core/models/Product';
import Store from 'src/app/core/models/Store';
import { CoreService } from './core.service';
import Stats from '../models/Stats';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _URI = 'http://us-central1-test-b7665.cloudfunctions.net/api/';

  constructor(private _http: HttpClient, private _coreService: CoreService) {}

  getAll(): Observable<Store> {
    this._coreService.showLoading();
    return this._http.get<Store>(this._URI + 'stores').pipe(
      finalize(() => {
        this._coreService.hideLoading();
      })
    );
  }

  getStoreById(id: string): Observable<Store> {
    this._coreService.showLoading();
    return this._http.get<Store>(this._URI + `stores/${id}`);
  }

  getProductsByStore(storeId: string): Observable<Product[]> {
    return this._http
      .get<Product[]>(this._URI + `stores/${storeId}/products`)
      .pipe(
        finalize(() => {
          this._coreService.hideLoading();
        })
      );
  }

  getChartByStore(storeID: string): Observable<Stats[]> {
    this._coreService.showLoading();
    return this._http.get<Stats[]>(
      this._URI + `stores/${storeID}/stats/categories`
    );
  }

  getProductById(storeId: string, productId: string): Observable<Product> {
    this._coreService.showLoading();
    return this._http
      .get<Product>(this._URI + `stores/${storeId}/products/${productId}`)
      .pipe(
        finalize(() => {
          this._coreService.hideLoading();
        })
      );
  }

  createProduct(productForm: Product, storeId: string): Observable<string> {
    this._coreService.showLoading();
    return this._http
      .post(this._URI + `stores/${storeId}/products`, productForm, {
        responseType: 'text',
      })
      .pipe(
        finalize(() => {
          this._coreService.hideLoading();
        })
      );
  }

  deleteProductById(storeId: string, productId: string): Observable<Product> {
    this._coreService.showLoading();
    return this._http
      .delete<Product>(this._URI + `stores/${storeId}/products/${productId}`)
      .pipe(
        finalize(() => {
          this._coreService.hideLoading();
        })
      );
  }
}
