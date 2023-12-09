import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss',
})
export class CategoryDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService,
  ) {}

  close() {
    this.dialogRef.close();
  }

  addCategory($event: any) {
    this.categoryService.addCategory(
      $event.formGroup,
      $event.incomeToggle,
      $event.subCategories,
    );
  }
}
