import { Injectable } from '@angular/core';
import { Weight } from '../model/Weight';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateConverter } from '../classes/DateConverter';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  weights:Map<string, Weight> = new Map();
  constructor(private httpClient:HttpClient, private authService:AuthService) { }


  
  fetchWeightsFromServer(onSucceed: (() => any) = () => {})
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.authService.headers)
    };

    this.httpClient.get<Weight[]>("https://localhost:7010/UserWeight/GetAllWeights", requestOptions).subscribe(weights => 
    {
      weights.forEach(val =>
      {
        this.weights.set(DateConverter.DateToString(new Date(val.date)), val);
      });

      onSucceed();
    })
  }

  get getTodaysWeight():Weight
  {
    return this.getWeight(new Date());
  }

  get orderedWeights():Weight[]
  {
    let weights = Array.from(this.weights.values()).sort((a,b) =>
      {
        if(a.date > b.date)
        {
          return 1;
        }
        else return -1;
      });

      return weights;
  }
  

  getWeight(date:Date):Weight
  {
    return this.weights.get(DateConverter.DateToString(date))!;
  }

  addWeight(weight:number, date:Date, onSucceed: (() => any) = () => {}):void
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.authService.headers)
    };

    const requestParams = 
    {
      "WeightInPounds": weight,
      "Date": DateConverter.DateToString(date)
    }

    this.httpClient.post<Weight>("https://localhost:7010/UserWeight/AddWeightRecord", requestParams, requestOptions).subscribe(
    {
      next: weight =>
      {
        this.weights.set(DateConverter.DateToString(new Date(weight.date)), weight);
        onSucceed();
      }
    })
  }

  removeWeight(date:Date, onSucceed: (() => any) = () => {}):void
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.authService.headers)
    };

    const requestParams = 
    {
      "Date": DateConverter.DateToString(date)
    }

    this.httpClient.post<number>("https://localhost:7010/UserWeight/RemoveWeightRecord", requestParams, requestOptions).subscribe(
    {
      next: num =>
      {
        this.weights.delete(DateConverter.DateToString(date));
        onSucceed();
      }
    })
  }
}
