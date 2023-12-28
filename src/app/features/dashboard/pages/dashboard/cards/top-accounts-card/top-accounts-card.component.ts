import { Component, OnInit } from '@angular/core';
import { AccountDto } from '../../../../../../graphql/__generated__';
import { GraphqlService } from '../../../../../../graphql/service/graphql.service';

@Component({
  selector: 'app-top-accounts-card',
  templateUrl: './top-accounts-card.component.html',
  styleUrl: './top-accounts-card.component.scss',
})
export class TopAccountsCardComponent implements OnInit {
  accounts: AccountDto[];

  constructor(private graphqlService: GraphqlService) {}
  ngOnInit(): void {
    this.graphqlService
      .getTopAccounts()
      .subscribe((v) => (this.accounts = v.data.getTopAccounts));
  }
}
