import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { firstDayOfTheMonth } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private dateAdapter: DateAdapter<Date>) {}

  public getLastMonthStart(): Date {
    const thisDayLastMonth = this.dateAdapter.addCalendarMonths(this.today, -1);
    return this.calculateMonth(thisDayLastMonth, false);
  }

  public getLastMonthEnd(): Date {
    return this.calculateMonth(this.dateAdapter.today(), true);
  }

  public getCurrentMonthStart(): Date {
    return this.calculateMonth(this.today, false);
  }

  public getCurrentMonthEnd(): Date {
    const today = this.today;
    const date = this.dateAdapter.addCalendarMonths(today, 1);
    return this.calculateMonth(date, true);
  }

  private get today(): Date {
    const today = this.dateAdapter.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }

  private calculateMonth(forDay: Date, end: boolean): Date {
    const year = this.dateAdapter.getYear(forDay);
    const month = this.dateAdapter.getMonth(forDay);
    let date = this.dateAdapter.createDate(year, month, 1);
    return this.dateAdapter.addCalendarDays(
      date,
      end ? firstDayOfTheMonth - 2 : firstDayOfTheMonth - 1,
    );
  }
}
