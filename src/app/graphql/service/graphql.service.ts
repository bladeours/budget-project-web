import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Filter, GetAccountGQL, GetTransactionsPageGQL, Page} from "../__generated__";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo, private getAccountGQL: GetAccountGQL, private getTransactionsPageGQL: GetTransactionsPageGQL) { }

  handleTo(to: number){
    let hash: string = "dw";
    this.getAccountGQL.fetch({hash}).subscribe(v => console.log(v));
  }

  getTransactionsPage(page: Page, filter: Filter): Observable<any> {
    return this.getTransactionsPageGQL.fetch({page, filter});
  }
}
