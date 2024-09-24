import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'app/core/models/product.interface';
import { User } from 'app/core/models/user.interface';
import { ProductService } from 'app/core/services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ModalService } from '@shared/modals-dialog/modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private productService = inject(ProductService);
  private readonly _modalSvc = inject(ModalService)

  user!:User;
  products!: Product[]


 

  ngOnInit(): void {
   this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(" USER PROFILE DESDE DASHBOARD: "+ this.user.role); 

    this.getProductByUserId(this.user.id);
    

  }


  getProductByUserId(id:number):void{
    this.productService.getProductByUserId(id)
    .subscribe(products => this.products = products);
    
  }

  onpenModalNewProduct(){
    this._modalSvc.openModal<CreateProductComponent>(CreateProductComponent);

  }
  

}
