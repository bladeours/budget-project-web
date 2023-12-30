import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipGrid, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ColorPickerComponent } from 'src/app/shared/components/color-picker/color-picker.component';
import { colors } from '../../../../environments/environment.template';
import {
  Category,
  SubCategory,
  SubCategoryInput,
} from '../../../../graphql/__generated__';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  @Output()
  addCategoryEvent = new EventEmitter<any>();
  @Output()
  closeEvent = new EventEmitter<any>();
  @Input()
  hash: string;
  @ViewChild('chipGrid', { read: ElementRef })
  chipGridRef: ElementRef;
  @ViewChild('chipGrid')
  chipGrid: MatChipGrid;
  @ViewChild('incomeToggle')
  incomeToggle: MatSlideToggle;
  @ViewChild('archiveToggle')
  archiveToggle: MatSlideToggle;
  @ViewChild('openColorPickerButton', { read: ElementRef })
  colorButton: ElementRef;
  currentColor: string;

  subCategories: SubCategoryInput[] = [];
  isCreate: Boolean = false;

  nameInput: FormControl<any> = new FormControl('', [Validators.required]);
  protected readonly colors = colors;


  nameCol: number;
  colorCol: number;
  subCategoryCol: number;
  toggleCol: number;
  subCategoryRow: number = 1;

  constructor(
    private dialog: MatDialog,
    private observer: BreakpointObserver,
    private graphqlService: GraphqlService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.isCreate = this.hash == null;
    if (!this.isCreate) {
      this.graphqlService.getCategory(this.hash).subscribe({
        next: (v) => {
          this.setCategory(v.data.getCategory as Category);
        },
      });
    } else {
      this.currentColor = colors[Math.floor(Math.random()*colors.length)];
      setTimeout(() => {
        this.colorButton.nativeElement.style.backgroundColor = this.currentColor
      } , 2);
    }

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches && this.isCreate) {
        this.nameCol = 2;
        this.colorCol = 2;
        this.subCategoryCol = 2;
        this.toggleCol = 2;
      } else {
        this.nameCol = 1;
        this.colorCol = 1;
        this.subCategoryCol = 1;
        this.toggleCol = 1;
      }
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.hash);
  }
  saveCategory() {
    if(this.nameInput.valid){
      if (this.isCreate) {
        this.addCategoryEvent.emit({
          nameInput: this.nameInput,
          color: this.currentColor,
          incomeToggle: this.incomeToggle,
          subCategories: this.subCategories,
        });
      } else {
        this.categoryService.updateCategory(
          this.hash,
          this.nameInput,
          this.currentColor,
          this.archiveToggle,
          this.subCategories,
        );
      }
    }

  }

  addSubCategory(event: MatChipInputEvent): void {
    const value = event.value;
    if (value) {
      this.subCategories.push({ name: value, hash: null });
    }
    event.chipInput!.clear();
    this.calculateChipRowSpan();
  }

  removeSubCategory(subCategory: SubCategoryInput) {
    this.subCategories = this.subCategories.filter(
      (value) => value !== subCategory,
    );
    this.calculateChipRowSpan();
  }
  setCategory(category: Category) {
    this.nameInput.setValue(category.name);
    this.currentColor = category.color;
    this.colorButton.nativeElement.style.backgroundColor = this.currentColor;
    this.archiveToggle.checked = category.archived;
    if (
      category.subCategories !== undefined &&
      category.subCategories !== null
    ) {
      this.subCategories = category.subCategories.map((c) => {
        return { name: c?.name, hash: c?.hash } as SubCategory;
      });
      setTimeout(() => {
        this.calculateChipRowSpan();
      }, 10);
    }
  }

  calculateChipRowSpan() {
    // if (this.subCategories.length == 0) {
    //   this.subCategoryRow = 1;
    // } else {
    //   this.subCategoryRow =
    //     this.chipGridRef.nativeElement.offsetHeight / 60 + 1;
    // }
  }

  close() {
    this.closeEvent.emit();
  }

  openColorPicker() {
    this.dialog.open(ColorPickerComponent).componentInstance.colorPicked.subscribe(
      color => {
        this.currentColor = color;
        this.colorButton.nativeElement.style.backgroundColor = color;
      }
    );
  }
}
