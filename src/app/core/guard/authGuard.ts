import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/authorization/service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
