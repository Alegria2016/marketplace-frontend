import { Routes } from '@angular/router';
import { AdminLayoutComponent } from 'app/layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const ADMIN_ROUTES: Routes = [

    {path: '', component:AdminLayoutComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'create-product', component: DashboardComponent},


    ]
    },
    
];
