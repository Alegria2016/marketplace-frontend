import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/core/services/product.service';
import { Product } from 'app/core/models/product.interface';
import { CartStateService } from '@shared/store/cart-state.service';
import { ProductDetailSateService } from '@shared/store/product-detail-state.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  providers: [ProductDetailSateService],
})
export default class DetailsComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  product!: Signal<Product | undefined>;

  private readonly productSvc = inject(ProductService);
  cartState = inject(CartStateService).state;
  productDetailState = inject(ProductDetailSateService).state;
  cart!: Product;

  id= input<number>(0, {alias: 'id' });

  ngOnInit(): void {
        this.product = this.productSvc.getProductById(Number(this.id()));
        this.productSvc.getProduct(Number(this.id())).subscribe((result: any) => {
        this.cart= result
    }
   )
  }

  addToCart() {
    this.cartState.add({
      product: this.cart,
      quantity: 1,
    });
  }


}
