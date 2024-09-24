import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject,  Observable, of } from 'rxjs';
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
    private  isLoggedIn = new BehaviorSubject<boolean>(true)

    user!:User;
    

    constructor(private http: HttpClient, private store:Store) { }

  
    loggIn(loginData:Login) : Observable<any>{
	  return this.http.post(`${this._endPoin}auth/authenticate`,loginData)
    }

    register(user:User) : Observable<any>{
        return this.http.post(`${this._endPoin}auth/register`,user);
      }


      
    isAuth() {
        const token: string | any = localStorage.getItem('token');
        if(token){
            return true;
        }
        return false;
    }

    isAdmin(): boolean {
        this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
        if( this.user!.role === ROLE_ADMIN){
            return true;

        }

        return false;
    }


  }