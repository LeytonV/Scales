import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSettings } from '../model/UserSettings';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  userSettings!: UserSettings;
  constructor(private httpClient:HttpClient, private loginService:LoginService) { }

  fetchSettings(onSucceed: (() => any) = () => {})
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.loginService.headers)
    };

    this.httpClient.get<UserSettings>("https://localhost:7010/User/GetUserData", requestOptions).subscribe(
      {
        next: data =>
        {
          this.userSettings = data;
          onSucceed();
        }
      })
  }

  updateSettings(userData:any, onSucceed: (() => any) = () => {})
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.loginService.headers)
    };

    this.httpClient.post<UserSettings>("https://localhost:7010/User/UpdateUser", userData, requestOptions).subscribe(
      {
        next: data =>
        {
          this.userSettings = data;
          console.log(this.userSettings);
          onSucceed();
        }
      })
  }
}
