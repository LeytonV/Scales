import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken:string = "";
  
  public headers = {
    'Authorization': "Bearer " + this.userToken
  }


  SetUserTokenAndHeaders(newToken:string):void
  {
    
    this.userToken = newToken;
    this.headers = 
    {
      'Authorization': "Bearer " + this.userToken
    }
  }
}
