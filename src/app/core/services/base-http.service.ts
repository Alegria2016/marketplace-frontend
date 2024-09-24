import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "environments/environment.development";


@Injectable({
    providedIn: 'root'
  })

export class BaseHttpService {
    readonly  _http = inject(HttpClient);
    readonly  _endPoin:string = environment.apiURL;
}