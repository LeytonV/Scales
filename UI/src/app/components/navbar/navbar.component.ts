import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input()
  public showSettings:boolean = false;
  @Output()
  onClickSettings = new EventEmitter();



  pressSettings():void
  {
    this.onClickSettings.emit();
  }

}
