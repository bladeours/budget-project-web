import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './features/authorization/pages/logout/logout.component';
import {HomeComponent} from './features/home/pages/home/home.component';
import {AuthComponent} from './features/authorization/pages/auth/auth/auth.component';
import {authGuard} from "./core/guard/authGuard";

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {path: 'logout', component: LogoutComponent, canActivate: [authGuard]},
  {path: 'register', component: AuthComponent},
  {path: 'login', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}