import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductService } from 'app/core/services/product.service';
import { Product } from 'app/core/models/product.interface';
import { CartStateService } from '@shared/store/cart-state.service';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {

  private readonly productSvc = inject(ProductService);
  products = this.productSvc.products;

  cartState = inject(CartStateService).state;

  addToCart(product:Product){
    this.cartState.add({
      product: product,
      quantity: 1,
    });
    

  }


}
