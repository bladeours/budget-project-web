import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../features/authorization/service/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(!authService.isAuthenticated()) {
    console.log("user not logged, -> login")
    router.navigate(["login"]);
    return false;
  }
  console.log("user logged, essa")
  // router.navigate(["register"]);
  return true;
};
