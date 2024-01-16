import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listType;
  @Input() itemList;

  @Output() event = new EventEmitter();

  grid = true;
  storeID;

  constructor(private _router: Router, private _activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  navigateTo(item) {
    if (this.listType == 'store') {
      this._router.navigateByUrl('dashboard/store/' + item.id);
    } else if (this.listType == 'product') {
      this.storeID = this._activeRoute.snapshot.params['storeID'];
      this._router.navigateByUrl(
        'dashboard/store/' + this.storeID + '/products/' + item.id
      );
    }
  }

  deleteItem(item) {
    this.event.emit({ status: 'delete', item: item, itemType: this.listType });
  }

  addItem() {
    this.event.emit({ status: 'create', itemType: this.listType });
  }

  layoutStyle() {
    this.grid = !this.grid;
  }
}
