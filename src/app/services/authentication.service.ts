import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from "../models/models-interfaces";
import { isNullOrUndefined } from 'util';

@Injectable()
export class UserService {
  public url: string;

    constructor( private _http:HttpClient){}
      headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
      });

      loginuser(user: string, pass: string): Observable<any> {
        return this._http
          .get<UserInterface>(
            (`https://marsol-test.herokuapp.com/login?user=${user}&pass=${pass}`),
            { headers: this.headers }
          )
          .pipe(map(data => data));
      }

      setUser(user: UserInterface): void {
        user.pass = "***";
        let user_string = JSON.stringify(user);
        localStorage.setItem("currentUser", user_string);
      }
    
      setToken(token): void {
        localStorage.setItem("accessToken", token);
      }
      getToken() {
        return localStorage.getItem("accessToken");
      }
      
      getCurrentUser(): UserInterface {
        let userString = localStorage.getItem("currentUser");
        if(isNullOrUndefined(userString)) {
          return null;
        } else {
          let user: UserInterface = JSON.parse(userString);
          return user;
        }
      }

      logout(): void {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("currentUser");
      }
      
}