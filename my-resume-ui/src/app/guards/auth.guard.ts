import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Constants } from '../../constants';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (
    typeof window !== 'undefined' &&
    localStorage.getItem(Constants.isAuthenticated)
  ) {
    return true;
  } else {
    router.navigate(['/loading']);
    return false;
  }
};
