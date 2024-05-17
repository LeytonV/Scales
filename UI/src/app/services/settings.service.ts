import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSettings } from '../model/UserSettings';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { WeightService } from './weight.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  userSettings!: UserSettings;

  OnSettingsUpdated:Subject<void> = new Subject<void>();
  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  fetchSettings(onSucceed: (() => any) = () => {})
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.authService.headers)
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
      headers: new HttpHeaders(this.authService.headers)
    };

    this.httpClient.post<UserSettings>("https://localhost:7010/User/UpdateUser", userData, requestOptions).subscribe(
      {
        next: data =>
        {
          this.userSettings = data;
          onSucceed();
          this.OnSettingsUpdated.next();
        }
      })
  }
}
