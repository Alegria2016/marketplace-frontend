import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { routes } from 'app/app.routes';
import { AuthService } from 'app/auth/auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuth()){
    return authService.isAuth();

  }else{
    router.navigateByUrl("/products");
    return false;

  }

  
};


export const isAdmin = () =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAdmin()){
    return authService.isAdmin();

  }else{
    router.navigateByUrl("/products");
    return false;

  }

}

