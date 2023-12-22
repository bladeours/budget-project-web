import { Injectable } from '@angular/core';
import { BudgetInput } from '../../../graphql/__generated__';
import { Utils } from '../../../shared/utils/Utils';
import { GraphqlService } from '../../../graphql/service/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private graphqlService: GraphqlService) {}

  public createBudget(plannedBudget: number, categoryHash: string, date: Date) {
    let budgetInput: BudgetInput = {
      date: Utils.getFullDateString(date),
      categoryHash: categoryHash,
      plannedBudget: plannedBudget,
      subCategoryHash: null,
    };
    return this.graphqlService.addBudget(budgetInput);
  }

  public updateBudget(plannedBudget: number, hash: string) {
    return this.graphqlService.updateBudget(plannedBudget, hash);
  }

  public deleteBudget(hash: string) {
    return this.graphqlService.deleteBudget(hash);
  }
}
