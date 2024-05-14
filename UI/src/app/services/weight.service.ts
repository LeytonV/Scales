import { Injectable } from '@angular/core';
import { Weight } from '../model/Weight';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateConverter } from '../classes/DateConverter';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  weights:Map<string, Weight> = new Map();
  constructor(private httpClient:HttpClient, private loginService:LoginService) { }


  //
  fetchWeightsFromServer(onSucceed: (() => any) = () => {})
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.loginService.headers)
    };

    this.httpClient.get<Weight[]>("https://localhost:7010/UserWeight/GetAllWeights", requestOptions).subscribe(weights => 
    {
      weights.forEach(val =>
      {
        this.weights.set(DateConverter.DateToString(new Date(val.date)), val);
      });

      console.log(this.weights);
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

  addWeight(weight:number, date:Date):void
  {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.loginService.headers)
    };

    console.log(DateConverter.DateToString(date));

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
      }
    })
  }
}
