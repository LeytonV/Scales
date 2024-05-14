import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

import { ProblemDetails } from '../../model/ProblemDetails';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../model/LoginResponse';
import { Weight } from '../../model/Weight';
import { WeightService } from '../../services/weight.service';
import { DateConverter } from '../../classes/DateConverter';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { LineChartComponent } from '../../charts/line-chart/line-chart.component';
import { WeightDisplayComponent } from '../../components/weight-display/weight-display.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SettingsService } from '../../services/settings.service';
import { WeightUtility } from '../../classes/WeightUtility';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CanvasJSAngularChartsModule,
    LineChartComponent,
    WeightDisplayComponent,
    SettingsComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  emailAddress:string = "";
  password:string = "";

  currentViewDate:Date = new Date();

  currentWeightValue:number = -1;

  settingsOpen:boolean = false;

  constructor(private loginService:LoginService, private weightService:WeightService, private settingsService:SettingsService)
  {

  }

  get isLoggedin():boolean
  {
    return this.loginService.isLoggedIn;
  }

  ngOnInit(): void
  {
    console.log("hi");
    this.loginService.loginUser("test@mail.com", "Test12!", (login) => {this.onLogin(login)}, (fail) => {this.onLoginFail(fail)});
  }

  onClickLogin():void
  {
    this.loginService.loginUser(this.emailAddress, this.password, (login) => {this.onLogin(login)}, (fail) => {this.onLoginFail(fail)});
  }

  onLogin(response:LoginResponse):void
  {
    console.log("login success!");
    this.weightService.fetchWeightsFromServer(() =>
    {
      this.currentWeightValue = Number(this.getCurrentWeight());
    });
  }

  onLoginFail(fail:HttpErrorResponse):void
  {
    console.log("login failed!");
  }

  onClickRegister():void
  {
    this.loginService.registerUser(this.emailAddress, this.password);
  }

  insertNewWeight():void
  {
    this.weightService.addWeight(Number(this.currentWeightValue), this.currentViewDate);
  }

  previousDay():void
  {
    this.currentViewDate.setDate(this.currentViewDate.getDate() - 1);
    let weight = this.viewedWeight;
    this.currentWeightValue = Number(this.getCurrentWeight());
  }

  nextDay():void
  {
    this.currentViewDate.setDate(this.currentViewDate.getDate() + 1);
    let weight = this.viewedWeight;
    this.currentWeightValue = Number(this.getCurrentWeight());
  }

  get viewedWeight():Weight
  {
    let today = this.weightService.getWeight(this.currentViewDate);
    return today;
  }



  get todaysDate():string
  {
    return DateConverter.PrettyDate(this.currentViewDate);
  }

  get weightGraphData(): [string[], string[]]
  {
    let orderedWeights = this.weightService.orderedWeights;

    let earliestDate:Date = new Date(orderedWeights[0].date);
    let recentDate:Date = new Date(orderedWeights[orderedWeights.length - 1].date);
    let msBetween:number = Math.abs(recentDate.getTime() - earliestDate.getTime())
    let daysBetween = Math.ceil(msBetween / (1000 * 3600 * 24)) + 1;

    let lastWeight = 0;
    let weights:string[] = [];
    let dates:string[] = [];
    let iterationDate:Date = new Date();
    for (let index = 0; index < daysBetween; index++)
    {
      iterationDate.setDate(earliestDate.getDate() + index);

      dates.push(iterationDate.toLocaleDateString());
      let weightEntry = this.weightService.getWeight(iterationDate);
      if(weightEntry != null)
      {
        lastWeight = weightEntry.weightInPounds;
      }

      weights.push(lastWeight.toString());
    }

    return [weights,dates];
  }

  get neighbourDayClass():string
  {
    let currentDate:Date = new Date();
    if(this.currentViewDate.getUTCDate() == currentDate.getUTCDate())
    {
      return "day today";
    }
    else if(this.currentViewDate.getUTCDate() == currentDate.getUTCDate() - 1)
    {
      return "day yesterday";
    }
    else if(this.currentViewDate.getUTCDate() == currentDate.getUTCDate() + 1)
    {
      return "day tomorrow";
    }

    return "";
  }

  getCurrentWeight():string
  {
    let weight = this.viewedWeight;
    let weightUnit = this.settingsService.userSettings?.preferredWeightUnit;
    return weight == null ? "No Weight Set" : WeightUtility.calculateWeight(weight.weightInPounds, weightUnit).toFixed(3).toString().replace(/[.,]000$/, "");;
  }

  openSettings()
  {
    this.settingsOpen = true;
  }

  closeSettings()
  {
    this.settingsOpen = false;
  }

}


