import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {GetAccountGQL} from "../__generated__";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo, private getAccount: GetAccountGQL) { }

  handleTo(to: number){
    console.log("no niby jo");
    let hash: string = "dw";
    this.getAccount.fetch({hash}).subscribe(v => console.log(v));
  }
}
