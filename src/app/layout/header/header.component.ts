import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { StorageService } from '@shared/store/storage.service';
import { ProductItemCart } from 'app/core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ModalService } from '@shared/modals-dialog/modal.service';
import RegisterComponent from 'app/auth/register/register.component';
import LoginComponent from 'app/auth/login/login.component';
import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/core/models/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,MatBadgeModule, MatMenuModule,MatIconModule, RouterLinkActive, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {

  private readonly _modalSvc = inject(ModalService)
  storeProducts = inject(StorageService);
  authService = inject(AuthService);
  
  userProfile!:User
  loggedUserName: string | any = localStorage.getItem('user.name');

  cart: ProductItemCart[] = [];
  total: number = 0;
  token = localStorage.getItem("token");

  ngOnInit(): void {
   this.getProductStorage();
   this.isLoggedIn();
  }





  onpenModalLogin(){
    this._modalSvc.openModal<LoginComponent>(LoginComponent);
  }


  getProductStorage(){
    this.storeProducts.loadProducts().subscribe((result: any) => {
      this.cart= result

      console.log(result)

  }
 )
}


isLoggedIn(){
  console.log(this.authService.isAuth())
  return true; //this.authService.isAuth()
   
}


}
