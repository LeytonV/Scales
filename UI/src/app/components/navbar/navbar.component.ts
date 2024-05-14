import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Output()
  onClickSettings = new EventEmitter();



  pressSettings():void
  {
    console.log("s");
    this.onClickSettings.emit();
  }

}
