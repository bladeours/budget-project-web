import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GraphqlService } from '../../../graphql/service/graphql.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Utils } from '../../../shared/utils/Utils';
import { PieChartService } from '../service/pie-chart.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Data } from '../model/Data';
import { BarChartService } from '../service/bar-chart.service';
import { CalendarHeaderComponent } from '../../../shared/components/calendar/calendar-header/calendar-header.component';
import { DateService } from '../../../shared/service/date.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  optionsExpense: EChartsOption;
  optionsExpenseBar: EChartsOption;
  expenseData: any[] | undefined;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  mergeOptions: EChartsOption;
  dateCol: number;
  chipCol: number;
  isSmall: boolean = false;

  constructor(
    private graphqlService: GraphqlService,
    private pieChartService: PieChartService,
    private barChartService: BarChartService,
    private observer: BreakpointObserver,
    private dateService: DateService,
  ) {}

  ngOnInit(): void {
    this.range.valueChanges.subscribe((v) => {
      this.setData(v, this.isSmall);
    });
    this.range.setValue({
      start: this.dateService.getCurrentMonthStart(),
      end: this.dateService.getCurrentMonthEnd(),
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.dateCol = 2;
        this.chipCol = 2;
        this.isSmall = true;
      } else {
        this.dateCol = 1;
        this.chipCol = 1;
        this.isSmall = false;
      }
      this.setData(this.range.value, this.isSmall);
    });
  }

  private setData(range: any, isSmall: boolean) {
    if (this.range.valid) {
      this.graphqlService
        .getAmountByCategory(
          Utils.getFullDateString(range.start),
          Utils.getFullDateString(range.end),
          false,
        )
        .subscribe((v) => {
          this.expenseData = v.data.getAmountByCategory?.map(
            (c) =>
              new Data(
                c?.name as string,
                c?.amount.toFixed(2),
                c?.color as string,
              ),
          );
          this.setOptionsForExpense(isSmall);
          this.setOptionsForExpenseBar(isSmall);
        });
    }
  }

  private setOptionsForExpense(isSmall: boolean) {
    this.optionsExpense = {
      backgroundColor: 'transparent',
      // @ts-ignore
      legend: this.pieChartService.getLegend(isSmall, this.expenseData),
      series: [
        {
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
            },
          },
          itemStyle: {
            color: (params) => {
              return (params.data as Data).color;
            },
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
          },
          name: 'Expenses',
          type: 'pie',
          radius: ['40%', '70%'],
          label: this.pieChartService.getLabel(isSmall),
          labelLine: this.pieChartService.getLabelLine(isSmall),
          data: this.expenseData,
        },
      ],
    };
  }

  private setOptionsForExpenseBar(isSmall: boolean) {
    this.optionsExpenseBar = {
      backgroundColor: 'transparent',
      //@ts-ignore
      tooltip: this.barChartService.getTooltip(isSmall),
      legend: {
        show: false,
      },
      grid: {
        containLabel: true,
        left: 'left',
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: this.expenseData?.map((v) => v.name),
        inverse: true,
      },
      series: [
        {
          label: {
            show: true,
            position: 'right',
            formatter: '{c}zł',
          },
          name: 'Spent',
          type: 'bar',
          data: this.expenseData,
          itemStyle: {
            color: (params) => {
              return (params.data as Data).color;
            },
            borderRadius: 10,
            borderWidth: 1,
          },
        },
      ],
    };
  }

  protected readonly CalendarHeaderComponent = CalendarHeaderComponent;
}
