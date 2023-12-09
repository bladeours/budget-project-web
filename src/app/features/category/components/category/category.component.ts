import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  hash: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((v) => (this.hash = v['id']));
  }
}
