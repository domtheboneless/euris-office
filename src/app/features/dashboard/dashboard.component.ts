import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Store from 'src/app/core/models/Store';
import { CoreService } from 'src/app/core/services/core.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-landing',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private subscriptions = [];
  loading$ = true;
  listType;
  itemList;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _storeService: StoreService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    //handler path
    this.listType = this.activatedRoute.snapshot.routeConfig.path;
    if (this.listType === 'store') {
      this.subscriptions.push(
        this._storeService.getAll().subscribe((item: Store) => {
          this.itemList = item;
        })
      );
    }

    this._coreService.loading$.subscribe((result) => {
      this.loading$ = result;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
