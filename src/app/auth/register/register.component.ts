import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput,  } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ModalService } from '@shared/modals-dialog/modal.service';
import LoginComponent from '../login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {


    private readonly _fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);
    private readonly _modalSvc = inject(ModalService)
    private router = inject(Router);

    registerForm!: FormGroup;

    constructor(private toastr: ToastrService) {}



  
    ngOnInit(): void {
      this._builForm();
     
    }


    private _builForm(): void{
      this.registerForm = this._fb.nonNullable.group({
        name: ['',[Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['',[Validators.required, Validators.minLength(5)]]

      })
    }


  
  register(){
    if(this.registerForm.valid){
      this._authService.register(this.registerForm.value).subscribe(response =>{
        if (response.valid)   {
          this.router.navigate(['/products']);
          this.toastr.success('Creacion Usuratio!', 'Usuario creado correctamente.!');
        }
        });

      console.log("register req data: ", this.registerForm.value);
      this._modalSvc.closeModal();
    }
    
  }

  
  onpenModalLogin(){
    this._modalSvc.closeModal();
    this._modalSvc.openModal<LoginComponent>(LoginComponent);
  }

  changeTemplate(){}

}
