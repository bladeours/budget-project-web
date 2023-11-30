import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  hash: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(v => this.hash=v['id']);
  }

}
