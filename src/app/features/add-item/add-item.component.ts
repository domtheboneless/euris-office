import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError, finalize } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  reviews = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private _storeService: StoreService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemForm = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      employee: [''],
      description: [''],
      reviews: this._fb.array([]),
    });
  }

  get reviewArray() {
    return this.itemForm.get('reviews') as FormArray;
  }

  getReviewControl(index: number): FormControl {
    return this.reviewArray.at(index) as FormControl;
  }

  addReview() {
    this.reviewArray.push(this._fb.control(''));
  }

  removeReview(index) {
    this.reviewArray.removeAt(index);
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this._storeService
        .createProduct(this.itemForm.value, this.dialogData.storeID)
        .subscribe({
          next: (result) => {
            this._dialogRef.close({
              status: 'success',
              idResult: result,
            });
          },
        });
    }
  }

  cancel() {
    this._dialogRef.close();
  }
}
