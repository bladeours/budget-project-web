import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './core/components/navigation/sidenav/nav.component';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {LoginComponent} from './features/authorization/pages/auth/login/login.component';
import {RegisterComponent} from './features/authorization/pages/auth/register/register.component';
import {LogoutComponent} from './features/authorization/pages/logout/logout.component';
import {HomeComponent} from './features/home/pages/home/home.component';
import {AuthComponent} from './features/authorization/pages/auth/auth/auth.component';
import {HeaderComponent} from './core/components/navigation/header/header.component';
import {NavParentComponent} from './core/components/navigation/nav-parent/nav-parent.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DashboardComponent} from './features/dashboard/pages/dashboard/dashboard.component';
import {PortalModule} from '@angular/cdk/portal';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {
  TransactionsCardComponent
} from './features/dashboard/pages/dashboard/cards/transactions-card/transactions-card.component';
import {
  TransactionCardComponent
} from './features/dashboard/pages/dashboard/cards/transactions-card/transaction-card/transaction-card.component';
import {TransactionsComponent} from './features/transactions/pages/transactions/transactions.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GraphQLModule} from './graphql.module';
import {DatePipe} from "@angular/common";

@NgModule({
  exports: [NavbarComponent],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
    AuthComponent,
    HeaderComponent,
    NavParentComponent,
    DashboardComponent,
    TransactionsCardComponent,
    TransactionCardComponent,
    TransactionsComponent,
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
    GraphQLModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
