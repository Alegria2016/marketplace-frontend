import { EnvironmentInjector, inject, Injectable, runInInjectionContext, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Category, Product } from 'app/core/models/product.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http = inject(HttpClient);
  private readonly _endPoin:string = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  public products = signal<Product[]>([]);
  user!:User;
  category!:Category;

  constructor() { 
    this.getAllProducts();
    
  }


  getAllProducts(): void{

     this._http.get<Product[]>(`${this._endPoin}products`)
    .pipe(tap((data: Product[]) => this.products.set(data) ))
    .subscribe();

  }


  getProductById(id:number){
    
  return  runInInjectionContext(this._injector, () =>
      toSignal<Product>(
       this._http.get<Product>(`${this._endPoin}products/${id}`)
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this._endPoin}products/${id}`);
  }


  getProductByUserId(id:number):  Observable<Array<Product>>{
    const headers = this.getHeader();
    return this._http.get<Array<Product>>(`${this._endPoin}products/user/${id}`,{headers});
  }


  private getHeader():HttpHeaders{
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization",`Bearer ${token}`);
  }


  createProduct(produc:Product): Observable<any>{
    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
    //const token: string | any = localStorage.getItem('token');
    //console.log("USUARIO DESDE CREAR P:"+ this.user.id)
    

    const headers = this.getHeader();

    return this._http.post(`${this._endPoin}products`,produc,{headers})
    


  }

  


  
}
