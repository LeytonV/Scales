import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/LoginResponse';
import { ProblemDetails } from '../model/ProblemDetails';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{

  isLoggedIn:boolean = false;

  constructor(private authService:AuthService, private httpClient:HttpClient, private userService:UserService) { }

  loginUser(email:string, password:string, onSucceed: ((info: LoginResponse) => any) = () => {}, onFail: ((problem: ProblemDetails) => any) = () => {}, ):void
  {

    const loginParams = 
    {
      "email": email,
      "password": password,
      "twoFactorCode": "string",
      "twoFactorRecoveryCode": "string"
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.authService.headers)
    };

    this.httpClient.post<LoginResponse>("https://localhost:7010/login", loginParams, requestOptions).subscribe({
      next: response => { 
        this.onLoginSuccess(response);
        onSucceed(response)},
      error: error => { onFail(error.error) }
    });
  }

  registerUser(email:string, password:string, onSucceed: (() => any) = () => {}, onFail: ((info: ProblemDetails) => any) = () => {})
  {
    const registerParams = 
    {
      "email": email,
      "password": password,
    }
    
    this.httpClient.post<HttpErrorResponse>("https://localhost:7010/register", registerParams).subscribe({
      next: () =>
      {
        onSucceed();
      },
      error: response =>
      {
        let problem:ProblemDetails = response.error;
        onFail(problem);
      }
    });
  }

  onLoginSuccess(info:LoginResponse):void
  {
    console.log("Logged in successfully!")

    //Set ourselves to logged in
    this.isLoggedIn = true;


    //Update the auth service's headers
    this.authService.SetUserTokenAndHeaders(info.accessToken);

    //Get the user service to get our data
    this.userService.GetUserData();
  }
}
