import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

export const authenticatedGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);

  var token = localStorage.getItem('token');
  if(token){
    return true;
  }

  router.navigateByUrl('/auth');
  return false;

};
