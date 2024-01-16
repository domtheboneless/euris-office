import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreService } from './core/services/store.service';
import { Observable } from 'rxjs';
import { CoreService } from './core/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'euris-office';
  loading$;

  constructor(
    private _coreService: CoreService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._coreService.loading$.subscribe((x) => {
      this.loading$ = x;
      this.cdref.detectChanges();
    });
  }
}
