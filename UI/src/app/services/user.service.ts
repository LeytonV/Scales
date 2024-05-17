import { Injectable } from '@angular/core';
import { WeightService } from './weight.service';
import { SettingsService } from './settings.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  constructor(private weightService:WeightService, private settingsService:SettingsService) { }

  weightsLoaded:boolean = false;
  settingsLoaded:boolean = false;

  OnGotUserData:Subject<void> = new Subject<void>();

  GetUserData():void
  {
    this.weightService.fetchWeightsFromServer(() =>
    {
      this.weightsLoaded = true;
      this.CheckForFullyLoaded();
    })
    this.settingsService.fetchSettings(() =>
    {
      this.settingsLoaded = true;
      this.CheckForFullyLoaded();
    })
  }

  CheckForFullyLoaded()
  {
    if(this.UserDataLoaded)
    {
      this.OnGotUserData.next();
    }
  }

  get UserDataLoaded():boolean
  {
    return this.weightsLoaded && this.settingsLoaded;
  }


}
