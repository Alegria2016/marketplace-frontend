import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { ModalService } from '@shared/modals-dialog/modal.service';
import { Product } from 'app/core/models/product.interface';
import { User } from 'app/core/models/user.interface';
import { ProductService } from 'app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  private readonly _modalSvc = inject(ModalService)
  private readonly _fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly  productSvc = inject(ProductService)


  createProductForm!: FormGroup;
  user!:User;
  products!: Product[];
  product!: Product;
  
  constructor(private toastr: ToastrService){
      
  }

   
  ngOnInit(): void {
    this._builForm();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
     console.log(" USER PROFILE DESDE DASHBOARD: "+ this.user.role); 
 
     this.getProductByUserId(this.user.id);
     
 
   }
   

  private _builForm(): void{
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.createProductForm = this._fb.nonNullable.group({
        name: ['',[Validators.required, Validators.min(4)]],
        sku: ['',[Validators.required, Validators.min(4)]],
        price: ['',[Validators.required, Validators.minLength(1)]],
        quantity: ['',[Validators.required, Validators.minLength(1)]],
        user: {
          id: this.user.id
        },
        category: {
          id: 1,
          name: ''

        },    
               
        
      })

      
  }



  createProduct():void{
    
    if(this.createProductForm.valid){
      
      this.productSvc.createProduct(this.createProductForm.value).subscribe(resp => {
        console.log(resp);
        this.toastr.success('Creación Producto', 'Producto creado correctamente.!');
      });    
      this._modalSvc.closeModal();
      
    }
  }

  closeModal(){
    this._modalSvc.closeModal();
    
  }


  
 
 
   getProductByUserId(id:number):void{
     this.productSvc.getProductByUserId(id)
     .subscribe(products => this.products = products);
     
   }


  
 

}
