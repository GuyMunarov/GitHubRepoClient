import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ILogin, IRegister, IUser } from '../Shared/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  public currentUser$ = this.currentUserSource.asObservable();
  public isAuthenticated: boolean = false;
  constructor(private http: HttpClient,private router: Router ) {
    this.currentUserSource.next(null);
   }

  login(values: ILogin){
    console.log(values);
    
    return this.http.post(this.baseUrl + "users/login",values).pipe(
      map((user: IUser)=>{
        this.isAuthenticated = true;
        sessionStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      }
    ))
  }

  register(values: IRegister){
    console.log(values);

    return this.http.post(this.baseUrl + "users/register",values).pipe(
      map((user: IUser)=>{
        this.isAuthenticated = true;
        sessionStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
        this.router.navigateByUrl('/');
      }
    ))
  }

  getCurrentUserValue(){
     this.currentUserSource.subscribe(res=> {return res});
  }


  loadCurrentUser(token: string){
    // headers.set("Authorization",'Bearer '+token);
    let headers = new HttpHeaders()
    headers = headers.set("Authorization",'Bearer '+token);    
    const requestOptions = {                                                                                                                                                                                 
      headers: headers, 
    };
    return this.http.get(this.baseUrl+'users',requestOptions).pipe(
      map((user: IUser)=>{
        if(user){
          this.isAuthenticated = true;
          sessionStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl("browse");
        }
      }
    ))
  }

  logout(){
    sessionStorage.removeItem('token');
    this.isAuthenticated = false;
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }

}
