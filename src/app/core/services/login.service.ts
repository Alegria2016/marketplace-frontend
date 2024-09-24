import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AccessResponse } from '../models/AccessResponse';
import { Login } from '../models/login.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _http = inject(HttpClient);
  private readonly _endPoin:string = environment.apiURL;

  constructor() { }


  register(user:User):Observable<AccessResponse>{

    return this._http.post<AccessResponse>(`${this._endPoin}auth/register`,user)

  }


  login(login:Login):Observable<AccessResponse>{

    return this._http.post<AccessResponse>(`${this._endPoin}auth/authenticate`,login)

  }

}
