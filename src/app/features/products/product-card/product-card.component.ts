import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from 'app/core/models/product.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  product = input.required<Product>();

  constructor(private toastr: ToastrService){
      
  }


  @Output() addToCartEvent = new EventEmitter<Product>()

  addToCart = output<Product>();

  add(event:Event): void{
    event.stopPropagation();
    event.preventDefault();
    this.addToCartEvent.emit(this.product());
    this.addToCart.emit(this.product())
    this.toastr.success('Agregar Producto', 'Se agrego el producto al carrito.!');
  }

}
