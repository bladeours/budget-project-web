import {Injectable} from '@angular/core';
import {CategoryInput, CategoryUpdateInput, SubCategory, SubCategoryInput} from "../../../graphql/__generated__";
import {GraphqlService} from "../../../graphql/service/graphql.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormGroup} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private graphqlService: GraphqlService, private router: Router, private snackBar: MatSnackBar) {
    }

    addCategory(formGroup: FormGroup, incomeToggle: MatSlideToggle, subCategories: SubCategory[]) {
        let input = this.getCategoryInput(formGroup, incomeToggle, subCategories);
        this.graphqlService.addCategory(input).subscribe({
            next: v => {
                this.snackBar.open("Category created properly", "close", {
                    duration: 2000
                }).afterDismissed()
                    .subscribe(() =>
                        this.router.navigate(["category"], {queryParams: {id: v.data?.addCategory?.hash}}).then(() => window.location.reload()));
            }
        });
    }

    private getCategoryInput(formGroup: FormGroup, incomeToggle: MatSlideToggle, subCategories: SubCategory[]): CategoryInput {
        return {
            color: formGroup.get("colorSelect")?.value,
            income: incomeToggle.checked,
            name: formGroup.get("nameInput")?.value,
            subCategories: subCategories
        }
    }

    private getCategoryUpdateInput(formGroup: FormGroup, archivedToggle: MatSlideToggle, subCategories: SubCategoryInput[]): CategoryUpdateInput {
        return {
            color: formGroup.get("colorSelect")?.value,
            archived: archivedToggle.checked,
            name: formGroup.get("nameInput")?.value,
            subCategories: subCategories
        }
    }

    updateCategory(hash: string, formGroup: FormGroup, archivedToggle: MatSlideToggle, subCategories: SubCategoryInput[]) {
        let input = this.getCategoryUpdateInput(formGroup, archivedToggle, subCategories);
        this.graphqlService.updateCategory(hash, input).subscribe({
            next: v => {
                this.snackBar.open("Category updated properly", "close", {
                    duration: 2000
                }).afterDismissed()
                    .subscribe(() => window.location.reload());
            }
        });
    }

    deleteCategory(hash: string){
        this.graphqlService.deleteCategory(hash).subscribe({
            next: v => {
                this.snackBar.open("Category deleted properly", "close", {
                    duration: 2000
                }).afterDismissed()
                    .subscribe(() => this.router.navigate([""]));
            }
        })
    }
}
