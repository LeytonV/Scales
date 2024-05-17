import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  
  @ViewChild('weightDisplay')
  input!: ElementRef;

  @Input()
  currentText:string = ""

  @Input()
  weightUnit:string = ""

  @Output()
  onChange = new EventEmitter<number>();

  @Output()
  onRemove = new EventEmitter();

  unfocusInput()
  {
    this.input.nativeElement.blur();
  }

  submitWeight()
  {
    if(this.currentText == null)
    {
      this.onRemove.emit();
    }
    else
    {
      this.onChange.emit(Number(this.currentText));
    }
  }

  onKeyUp(ev:KeyboardEvent)
  {
    if(ev.key == "Enter")
    {
      this.unfocusInput();
    }
  }

}
