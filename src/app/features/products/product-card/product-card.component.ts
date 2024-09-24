import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from 'app/core/models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  product = input.required<Product>();


  @Output() addToCartEvent = new EventEmitter<Product>()

  addToCart = output<Product>();

  add(event:Event): void{
    event.stopPropagation();
    event.preventDefault();
    //this.addToCartEvent.emit(this.product());
    this.addToCart.emit(this.product())
    console.log("|")
  }

}
