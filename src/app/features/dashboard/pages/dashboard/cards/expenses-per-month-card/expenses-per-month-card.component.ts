import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GraphqlService } from '../../../../../../graphql/service/graphql.service';
import { Utils } from '../../../../../../shared/utils/Utils';

@Component({
  selector: 'app-expenses-per-month-card',
  templateUrl: './expenses-per-month-card.component.html',
  styleUrl: './expenses-per-month-card.component.scss',
})
export class ExpensesPerMonthCardComponent {
  mergeOptions: EChartsOption;
  options: EChartsOption;
  data: number[];

  constructor(private graphqlService: GraphqlService) {}
  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    this.graphqlService
      .getExpensesPerMonth(Utils.getFullDateString(new Date()))
      .subscribe((v) => {
        this.data = v.data.getExpensesPerMonth as number[];
        this.setOptionsForExpense();
      });
  }

  private setOptionsForExpense() {
    this.options = {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.data,
          type: 'bar',
        },
      ],
    };
  }
}
