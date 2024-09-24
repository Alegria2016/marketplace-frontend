import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { AccessResponse } from 'app/core/models/AccessResponse';
import { MatDialogContent } from '@angular/material/dialog';
import { ModalService } from '@shared/modals-dialog/modal.service';
import RegisterComponent from '../register/register.component';
import { User } from 'app/core/models/user.interface';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{

  private readonly _fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private readonly _modalSvc = inject(ModalService)
 

  loginForm!: FormGroup;
  user!:User;

  




  ngOnInit(): void {
    this._builForm();
   
  }
   

  private _builForm(): void{
      this.loginForm = this._fb.nonNullable.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(3)]],
      })
  }


  login():void{
    if(this.loginForm.valid){
      const rest =  this.authService.login(this.loginForm.value)
      this._modalSvc.closeModal();
      
    }
  }


  

  onpenModalRegister(){
    this._modalSvc.closeModal();
    this._modalSvc.openModal<RegisterComponent>(RegisterComponent);
  }

  

 

}
