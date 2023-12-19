import { Injectable } from '@angular/core';
import {
  CategoryInput,
  CategoryUpdateInput,
  SubCategory,
  SubCategoryInput,
} from '../../../graphql/__generated__';
import { GraphqlService } from '../../../graphql/service/graphql.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBarService } from '../../../shared/service/mat-snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private matSnackBarService: MatSnackBarService,
  ) {}

  public addCategory(
    nameInput: FormControl,
    color: string,
    incomeToggle: MatSlideToggle,
    subCategories: SubCategory[],
  ) {
    let input = this.getCategoryInput(nameInput, color, incomeToggle, subCategories);
    this.graphqlService.addCategory(input).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Category created properly')
          .afterDismissed()
          .subscribe(() =>
            this.router
              .navigate(['category'], {
                queryParams: { id: v.data?.addCategory?.hash },
              })
              .then(() => window.location.reload()),
          );
      },
    });
  }

  public updateCategory(
    hash: string,
    nameInput: FormControl,
    color: string,
    archivedToggle: MatSlideToggle,
    subCategories: SubCategoryInput[],
  ) {
    let input = this.getCategoryUpdateInput(
      nameInput,
      color,
      archivedToggle,
      subCategories,
    );
    this.graphqlService.updateCategory(hash, input).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Category updated properly')
          .afterDismissed()
          .subscribe(() => window.location.reload());
      },
    });
  }

  public deleteCategory(hash: string) {
    this.graphqlService.deleteCategory(hash).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Category deleted properly')
          .afterDismissed()
          .subscribe(() => this.router.navigate(['']));
      },
    });
  }

  private getCategoryInput(
    nameInput: FormControl,
    color: string,
    incomeToggle: MatSlideToggle,
    subCategories: SubCategory[],
  ): CategoryInput {
    return {
      color: color,
      income: incomeToggle.checked,
      name: nameInput.value,
      subCategories: subCategories,
    };
  }

  private getCategoryUpdateInput(
    nameInput: FormControl,
    color: string,
    archivedToggle: MatSlideToggle,
    subCategories: SubCategoryInput[],
  ): CategoryUpdateInput {
    return {
      color: color,
      archived: archivedToggle.checked,
      name: nameInput.value,
      subCategories: subCategories,
    };
  }
}
