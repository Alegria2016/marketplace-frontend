import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '@shared/modals-dialog/modal.service';
import { StorageService } from '@shared/store/storage.service';
import LoginComponent from 'app/auth/login/login.component';
import { ProductItemCart } from 'app/core/models/product.interface';
import { User } from 'app/core/models/user.interface';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink,MatBadgeModule, MatMenuModule,MatIconModule, RouterLinkActive, CurrencyPipe],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  private readonly _modalSvc = inject(ModalService)
  storeProducts = inject(StorageService);
  


  userProfile!:User

  cart: ProductItemCart[] = [];
  total: number = 0;
  token = localStorage.getItem("token");

  ngOnInit(): void {
   this.getProductStorage();
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


}
