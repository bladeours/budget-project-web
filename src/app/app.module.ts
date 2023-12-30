import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navigation/sidenav/nav.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginComponent } from './features/authorization/pages/auth/login/login.component';
import { RegisterComponent } from './features/authorization/pages/auth/register/register.component';
import { LogoutComponent } from './features/authorization/pages/logout/logout.component';
import { AuthComponent } from './features/authorization/pages/auth/auth/auth.component';
import { HeaderComponent } from './core/components/navigation/header/header.component';
import { NavParentComponent } from './core/components/navigation/nav-parent/nav-parent.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { TransactionsCardComponent } from './features/dashboard/pages/dashboard/cards/transactions-card/transactions-card.component';
import { TransactionCardComponent } from './features/transactions/component/transaction-card/transaction-card.component';
import { TransactionsComponent } from './features/transactions/component/transactions/transactions.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GraphQLModule } from './graphql.module';
import { DatePipe } from '@angular/common';
import { AppDateAdapter, MY_DATE_FORMATS } from './shared/utils/AppDateAdapter';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AccountFormComponent } from './features/account/components/account-form/account-form.component';
import { AccountComponent } from './features/account/components/account/account.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccountTransactionsComponent } from './features/account/components/account-transactions/account-transactions.component';
import { CategoryComponent } from './features/category/components/category/category.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryFormComponent } from './features/category/components/category-form/category-form.component';
import { CategoryTransactionsComponent } from './features/category/components/category-transactions/category-transactions.component';
import { AccountDialogComponent } from './features/account/dialog/account-dialog/account-dialog.component';
import { CategoryDialogComponent } from './features/category/dialog/category-dialog/category-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StatisticsComponent } from './features/statistics/pages/statistics.component';
import { TransactionDialogComponent } from './features/transactions/dialog/transaction-dialog/transaction-dialog.component';
import { CalendarHeaderComponent } from './shared/components/calendar/calendar-header/calendar-header.component';
import { CalendarRangePanelComponent } from './shared/components/calendar/calendar-range-panel/calendar-range-panel.component';
import { MyPaginatorComponent } from './shared/components/my-paginator/my-paginator.component';
import { ColorPickerComponent } from './shared/components/color-picker/color-picker.component';
import { BudgetComponent } from './features/budget/components/budget/budget.component';
import { CalendarYearMonthComponent } from './shared/components/calendar-year-month/calendar-year-month.component';
import { BudgetCardComponent } from './features/budget/components/budget-card/budget-card.component';
import { BudgetDialogComponent } from './features/budget/dialog/budget-dialog/budget-dialog.component';
import { PlannedIncomeCardComponent } from './features/budget/components/planned-income-card/planned-income-card.component';
import { PlannedIncomeDialogComponent } from './features/budget/dialog/planned-income-dialog/planned-income-dialog.component';
import { IncomeExpenseCardComponent } from './features/dashboard/pages/dashboard/cards/income-expense-card/income-expense-card.component';
import { TransactionPerDayOfTheWeekCard } from './features/dashboard/pages/dashboard/cards/transaction-per-day-of-the-week-card/transaction-per-day-of-the-week.component';
import { TopAccountsCardComponent } from './features/dashboard/pages/dashboard/cards/top-accounts-card/top-accounts-card.component';
import { ExpensesPerMonthCardComponent } from './features/dashboard/pages/dashboard/cards/expenses-per-month-card/expenses-per-month-card.component';
import { ImportComponent } from './features/import/components/import/import.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [NavbarComponent, TransactionCardComponent, AccountFormComponent],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AuthComponent,
    HeaderComponent,
    NavParentComponent,
    DashboardComponent,
    TransactionsCardComponent,
    TransactionCardComponent,
    TransactionsComponent,
    AccountFormComponent,
    AccountComponent,
    AccountTransactionsComponent,
    CategoryComponent,
    CategoryFormComponent,
    CategoryTransactionsComponent,
    AccountDialogComponent,
    CategoryDialogComponent,
    PageNotFoundComponent,
    StatisticsComponent,
    TransactionDialogComponent,
    CalendarHeaderComponent,
    CalendarRangePanelComponent,
    MyPaginatorComponent,
    ColorPickerComponent,
    BudgetComponent,
    CalendarYearMonthComponent,
    BudgetCardComponent,
    BudgetDialogComponent,
    PlannedIncomeCardComponent,
    PlannedIncomeDialogComponent,
    IncomeExpenseCardComponent,
    TransactionPerDayOfTheWeekCard,
    TopAccountsCardComponent,
    ExpensesPerMonthCardComponent,
    ImportComponent,
  ],
  imports: [
    MatTableModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatMenuModule,
    MatSnackBarModule,
    PortalModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    GraphQLModule,
    MatDialogContent,
    MatDialogModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
