import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { WeightUnits } from '../../classes/WeightUtility';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnChanges
{
  constructor(private settingsService:SettingsService)
  {
    
  }
  @Input()
  isOpen:boolean = false;

  settingsTab:number = 0;


  @Output()
  onClose = new EventEmitter();


  email:string | undefined = "";

  weightUnit:number | undefined = 0;

  ngOnChanges()
  {
    this.settingsService.fetchSettings(() =>
    {
      this.onSettingsRetrieved();
    });
  }



  get OpenCSS():string
  {
    return this.isOpen ? " open" : "";
  }

  setSettingsTab(tab:number)
  {
    this.settingsTab = tab;
  }

  onSettingsRetrieved()
  {
    this.email = this.settingsService.userSettings?.email;
    this.weightUnit = this.settingsService.userSettings?.preferredWeightUnit;
  }

  saveSettings():void
  {
    const newSettings = 
    {
      "Email": this.email,
      "PreferredWeightUnit": this.weightUnit
    }
    this.settingsService.updateSettings(newSettings);
  }

  get settingsLoaded():boolean
  {
    return this.settingsService.userSettings != null;
  }

  get getWeightUnits():WeightUnits[]
  {
    let values = Object.values(WeightUnits);


    let returnArray:WeightUnits[] = [];
    for (let index = 0; index < values.length/2; index++) {
      let unit:WeightUnits = index;
      returnArray.push(unit);
      
    }
    return returnArray;
  }


  weightUnitName(num:number):string
  {
    return WeightUnits[num].toString();
  }

  settingsTabClass(num:number):string
  {
    return this.settingsTab == num ? " selected" : "";
  }

}
