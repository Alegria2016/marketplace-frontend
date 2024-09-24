import { Injectable, inject } from '@angular/core';
import { Product } from 'app/core/models/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from 'app/core/services/product.service';
import { Observable, map, switchMap } from 'rxjs';

interface State {
  product: Product | null;
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductDetailSateService {
  private productsService = inject(ProductService);

  private initialState: State = {
    product: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<number>) =>
        $.pipe(
          switchMap((id) => this.productsService.getProduct(id)),
          map((data) => ({ product: data, status: 'success' as const })),
        ),
    },
  });
}