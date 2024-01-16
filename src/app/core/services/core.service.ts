import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  loading$ = new BehaviorSubject<boolean>(false);
  showLoading() {
    this.loading$.next(true);
  }
  hideLoading() {
    this.loading$.next(false);
  }

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  goTo(route) {
    this._router.navigateByUrl(route);
  }

  openDialog(component: ComponentType<any>, message?: MatDialogConfig<string>) {
    return this.dialog.open(component, message);
  }

  snackBar(message: string, button: string) {
    this._snackBar.open(message, button, {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
