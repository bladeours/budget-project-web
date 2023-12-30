import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../../../environments/environment';
import { finalize } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
})
export class ImportComponent {
  fileName = '';
  inprogress: boolean = false;
  file: File;
  @ViewChild('normalButton')
  normalButton: MatButton;
  @ViewChild('oneMoneyButton')
  oneMoneyButton: MatButton;

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
  ) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;
      this.normalButton.disabled = false;
      this.oneMoneyButton.disabled = false;
    }
  }

  oneMoneyImport() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.inprogress = true;
    this.http
      .post(`${baseUrl}/onemoney`, formData)
      .pipe(finalize(() => (this.inprogress = false)))
      .subscribe({
        error: (err) => {
          if (err.status != 200) {
            this.matSnackBar.open('problem with importing', 'close');
          } else {
            this.matSnackBar.open('imported properly', 'close', {
              duration: 2000,
            });
          }
        },
      });
  }

  normalImport() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.inprogress = true;
    this.http
      .post(`${baseUrl}/import`, formData)
      .pipe(finalize(() => (this.inprogress = false)))
      .subscribe({
        error: (err) => {
          if (err.status != 200) {
            this.matSnackBar.open('problem with importing', 'close');
          } else {
            this.matSnackBar.open('imported properly', 'close', {
              duration: 2000,
            });
          }
        },
      });
  }
}
