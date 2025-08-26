import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

export const notAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);

  var token = localStorage.getItem('token');
  if(token){
    router.navigateByUrl('/');
    return false;
  }

  return true;

};
