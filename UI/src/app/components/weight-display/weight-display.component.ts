import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeightUtility } from '../../classes/WeightUtility';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-weight-display',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weight-display.component.html',
  styleUrl: './weight-display.component.css'
})
export class WeightDisplayComponent
{

  constructor(private settingsService:SettingsService)
  {

  }
  
  @ViewChild('inputField') input: any;

  @Input()
  currentText:string = ""

  @Output()
  onSubmit = new EventEmitter<number>();

  onUpdate()
  {
    if(this.currentText == null)
    {
      this.currentText = "0";
    }
    console.log(this.currentText);
  }

  makeValueNumber(text:string):number
  {
    text = text.replace(/\D/g, '');
    if(text.length == 0)
      return -2;
    else
      return Number(text);
  }

  get weightUnitName():string
  {
    return WeightUtility.getPluralWeightName(this.settingsService.userSettings?.preferredWeightUnit);
  }

}
