import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/LoginResponse';
import { RegisterResponse } from '../model/RegisterResponse';
import { ProblemDetails } from '../model/ProblemDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userToken:string = "";

  isLoggedIn:boolean = false;
  
  public headers = {
    'Authorization': this.userToken,
  }

  constructor(private httpClient:HttpClient) { }

  loginUser(email:string, password:string, onSucceed: ((info: LoginResponse) => any) = () => {}, onFail: ((error: HttpErrorResponse) => any) = () => {}, ):void
  {

    const loginParams = 
    {
      "email": email,
      "password": password,
      "twoFactorCode": "string",
      "twoFactorRecoveryCode": "string"
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headers)
    };

    this.httpClient.post<LoginResponse>("https://localhost:7010/login", loginParams, requestOptions).subscribe({
      next: response => { 
        this.onLoginSuccess(response);
        onSucceed(response)},
      error: error => { onFail(error) }
    });
  }

  registerUser(email:string, password:string)
  {
    const registerParams = 
    {
      "email": email,
      "password": password,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headers)
    };
    
    this.httpClient.post<RegisterResponse>("https://localhost:7010/register", registerParams, requestOptions).subscribe(response => 
    {
      console.log(response.detail);
    })
  }

  onLoginSuccess(info:LoginResponse):void
  {
    this.userToken = info.accessToken;
    //Store our auth token in the authorization header so we can fetch data
    this.headers['Authorization'] = "Bearer " + this.userToken;

    //Set ourselves to logged in
    this.isLoggedIn = true;
  }
}
