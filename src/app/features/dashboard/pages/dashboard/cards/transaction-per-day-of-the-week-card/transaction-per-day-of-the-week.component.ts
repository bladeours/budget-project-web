import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GraphqlService } from '../../../../../../graphql/service/graphql.service';
import { Utils } from '../../../../../../shared/utils/Utils';

@Component({
  selector: 'app-category-per-month-card',
  templateUrl: './transaction-per-day-of-the-week.component.html',
  styleUrl: './transaction-per-day-of-the-week.component.scss',
})
export class TransactionPerDayOfTheWeekCard implements OnInit {
  mergeOptions: EChartsOption;
  options: EChartsOption;
  data: number[];

  constructor(private graphqlService: GraphqlService) {}
  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    this.graphqlService
      .getExpensesPerDayOfTheWeek(Utils.getFullDateString(new Date()))
      .subscribe((v) => {
        this.data = v.data.getExpensesPerDayOfTheWeek as number[];
        this.setOptionsForExpense();
      });
  }

  private setOptionsForExpense() {
    this.options = {
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      backgroundColor: 'transparent',
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
