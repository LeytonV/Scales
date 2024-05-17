import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

import { ProblemDetails } from '../../model/ProblemDetails';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../model/LoginResponse';
import { Weight } from '../../model/Weight';
import { WeightService } from '../../services/weight.service';
import { DateConverter } from '../../classes/DateConverter';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { WeightDisplayComponent } from '../../components/weight-display/weight-display.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SettingsService } from '../../services/settings.service';
import { WeightUnits, WeightUtility } from '../../classes/WeightUtility';
import { UserService } from '../../services/user.service';
import { LinechartComponent } from '../../components/linechart/linechart.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CanvasJSAngularChartsModule,
    WeightDisplayComponent,
    SettingsComponent,
    NavbarComponent,
    LinechartComponent,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit
{

  currentViewDate:Date = new Date();

  settingsOpen:boolean = false;

  weightDisplayText:string = "";
  weightDisplayUnit:string = "";

  //-----Line chart
  lineChartWeights:number[] = [];

  lineChartDates:string[] = []

  currentDateLocaleString:string = "";

  constructor(private userService:UserService, private loginService:LoginService, private weightService:WeightService, private settingsService:SettingsService)
  {

  }

  get isLoggedin():boolean
  {
    return this.loginService.isLoggedIn;
  }

  ngOnInit(): void
  {

    this.userService.OnGotUserData.subscribe(() =>
    {
      this.OnUserDataRetrieved();

      this.settingsService.OnSettingsUpdated.subscribe(() =>
      {
        this.updateVisuals();
      })
    })
  }

  OnUserDataRetrieved():void
  {
    this.updateVisuals();
  }

  updateVisuals():void
  {
    this.updateWeightDisplayText();
    this.updateGraphWeightData();
  }

  OnSettingsChanged():void
  {
    this.updateVisuals();
  }

  insertNewWeight(weight:number):void
  {
    let pounds = WeightUtility.weightToPounds(weight, this.settingsService.userSettings.preferredWeightUnit);
    this.weightService.addWeight(pounds, this.currentViewDate, () =>
    {
      this.updateGraphWeightData();
    });
  }

  get viewedWeight():Weight
  {
    let today = this.weightService.getWeight(this.currentViewDate);
    return today;
  }

  updateViewedDate(increment:number):void
  {
    this.currentViewDate.setDate(this.currentViewDate.getDate() + increment);
    this.updateVisuals();
  }


  get todaysDate():string
  {
    return DateConverter.PrettyDate(this.currentViewDate);
  }

  updateGraphWeightData()
  {
    let orderedWeights = this.weightService.orderedWeights;

    if(orderedWeights.length > 0)
    {
      let earliestDate:Date = new Date(orderedWeights[0].date);
      let recentDate:Date = new Date(orderedWeights[orderedWeights.length - 1].date);
      let msBetween:number = Math.abs(recentDate.getTime() - earliestDate.getTime())
      let daysBetween = Math.ceil(msBetween / (1000 * 3600 * 24)) + 1;

      let lastWeight = 0;
      let weights:number[] = [];
      let dates:string[] = [];
      let iterationDate:Date = new Date();
      for (let index = 0; index < daysBetween; index++)
      {
        iterationDate.setDate(earliestDate.getDate() + index);

        dates.push(iterationDate.toLocaleDateString());
        let weightEntry = this.weightService.getWeight(iterationDate);
        if(weightEntry != null)
        {
          lastWeight = WeightUtility.calculateWeight(weightEntry.weightInPounds, this.settingsService.userSettings.preferredWeightUnit);
        }

        weights.push(lastWeight);
      }

      this.lineChartWeights = weights;
      this.lineChartDates = dates;
    }
    else
    {
      this.lineChartWeights = [];
      this.lineChartDates = [];
    }
    this.currentDateLocaleString = this.currentViewDate.toLocaleDateString();
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

  setSettingsMenuState(state:boolean)
  {
    this.settingsOpen = state;
  }

  removeWeight()
  {
    this.weightService.removeWeight(this.currentViewDate, () =>
    {
      this.updateGraphWeightData();
    })
  }

  updateWeightDisplayText()
  {
    let weight = this.viewedWeight;
    let weightUnit = this.settingsService.userSettings?.preferredWeightUnit;
    this.weightDisplayText = weight == null ? "No Weight Set" : WeightUtility.calculateWeight(weight.weightInPounds, weightUnit).toFixed(3).toString().replace(/[.,]000$/, "");
    this.weightDisplayUnit = WeightUtility.getPluralWeightName(this.settingsService.userSettings?.preferredWeightUnit);
  }

  get UserDataLoaded()
  {
    return this.userService.UserDataLoaded;
  }

}


