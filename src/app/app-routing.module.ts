import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authorization/pages/auth/login/login.component';
import { RegisterComponent } from './features/authorization/pages/auth/register/register.component';
import { LogoutComponent } from './features/authorization/pages/logout/logout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AuthComponent } from './features/authorization/pages/auth/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
