import { Routes } from '@angular/router';
import { authGuard, isAdmin } from './core/guards/auth.guard';


export const routes: Routes = [

    {path: 'products', 
        loadChildren:() => import('./features/products/products.route').then(r=>r.PRODUCT_ROUTES)   
    },


    {path: 'dashboard', 
        loadChildren:() => import('./features/admin/admin.routes').then(r=>r.ADMIN_ROUTES),
        canActivate: [
            isAdmin
        ]  
    },
   

      
   

    {path: 'carts', 
        loadComponent:() => import('./features/cart/cart.component'), canActivate:[
            authGuard
        ]
    },


    {path: '', redirectTo:'products', pathMatch: 'full'},
    {path: '**', redirectTo:'products', pathMatch: 'full'},
   
    
];
