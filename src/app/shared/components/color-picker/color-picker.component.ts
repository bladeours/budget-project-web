import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { colors } from 'src/app/environments/environment.template';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {


  colors: string[] = colors;
  @Output()
  colorPicked = new EventEmitter<string>();

  constructor(private dialogRef: MatDialogRef<ColorPickerComponent>){}

  close() {
    this.dialogRef.close();
  }

  pickColor(color: string) {
    this.colorPicked.emit(color);
    this.dialogRef.close();
  }

}
