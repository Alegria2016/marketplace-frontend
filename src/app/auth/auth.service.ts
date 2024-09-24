import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from './auth.actions';
import { environment } from 'environments/environment.development';
import { Login } from 'app/core/models/login.interface';
import { User } from 'app/core/models/user.interface';
import { ROLE_ADMIN } from 'environments/environment';


@Injectable({
    providedIn: 'root'
  })

  export class AuthService{
    
    private readonly _http = inject(HttpClient);
    private readonly _endPoin:string = environment.apiURL;
    private  isLoggedIn = new BehaviorSubject<boolean>(false)

    user!:User;
    

    constructor(private http: HttpClient, private store:Store) { }


    login(loginData:Login){
        return this.http.post(`${this._endPoin}auth/authenticate`,loginData).pipe(
            map((user:any)=>{
                if(user.valid && user.token.length > 0){
                    localStorage.setItem("token",user.token)
                    localStorage.setItem("user", JSON.stringify(user.user));
                    

                }
                return loginSuccess({user})
            }),
            catchError((error)=>{
                return of(
                    loginFailure(
                        error.response && error.response.data.message ?
                        error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action)=>this.store.dispatch(action))

    }

    register(user:any){
        return this.http.post(`${this._endPoin}auth/register`,user).pipe(
            map((user:any)=>{
                console.log('register user: ', user)
                if(user.jwt){
                    //localStorage.setItem("tokent",user.jwt);
                }
                return registerSuccess({user})
            }),
            catchError((error)=>{
                return of(
                    registerFailure(
                        error.response && error.response.data.message ?
                        error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action)=>this.store.dispatch(action))

    }


    
    isAuth() {

        const token: string | any = localStorage.getItem('token');
        //return serializableState !== null || serializableState === undefined ? JSON.parse(serializableState) : undefined;      
        if(token){
            return true;

        }
        return false;
            
    }

    isAdmin() {
        this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
        //console.log("CONDICION ADMIN: "+ this.user.role)
        if( this.user!.role === ROLE_ADMIN){
            return true;

        }

        return false;
    }


  }