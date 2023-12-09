import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './features/authorization/pages/logout/logout.component';
import { AuthComponent } from './features/authorization/pages/auth/auth/auth.component';
import { authGuard } from './core/guard/authGuard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NavParentComponent } from './core/components/navigation/nav-parent/nav-parent.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: NavParentComponent,
    children: [
      {
        path: 'transactions',
        component: NavParentComponent,
      },
      {
        path: 'account',
        component: NavParentComponent,
      },
      {
        path: 'category',
        component: NavParentComponent,
      },
      {
        path: 'statistics',
        component: NavParentComponent,
      },
    ],
  },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
