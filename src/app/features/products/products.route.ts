import { Routes } from '@angular/router';


export const PRODUCT_ROUTES: Routes = [

    {path: '', 
        loadComponent:() => import('./product.component')
    },
    {path: ':id', 
        loadComponent:() => import('./details/details.component')
    },
   
    
];


