import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-paginator',
  templateUrl: './my-paginator.component.html',
  styleUrl: './my-paginator.component.scss',
})
export class MyPaginatorComponent {
  @Input()
  length = 100;
  @Input()
  pageSize = 25;
  @Input()
  pageIndex = 0;
  @Input()
  pageSizeOptions = [10, 25, 50, 100];
  @Output() pageEventEmitter = new EventEmitter<PageEvent>();

  handlePageEvent($event: PageEvent) {
    this.pageEventEmitter.emit($event);
  }
}
