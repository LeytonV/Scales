import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../model/LoginResponse';
import { ProblemDetails } from '../../model/ProblemDetails';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{

  constructor(private loginService:LoginService)
  {
    
  }
  @Input()
  emailAddress:string = "";
  @Input()
  password:string = "";

  @Output()
  onLogin = new EventEmitter();
  @Output()
  onRegister = new EventEmitter();


  currentErrorMessage:string = "";
  errorMessageClass:string = "errorMessage closed";


  Login()
  {
    this.loginService.loginUser(this.emailAddress, this.password, () => this.onLoginSuccess, (fail) => this.onLoginFail(fail));
  }

  Register()
  {
    this.loginService.registerUser(this.emailAddress, this.password, () => this.onRegisterSuccess(), (details) => this.onRegisterFail(details));
  }

  onLoginSuccess(info:LoginResponse)
  {
    this.onLogin.emit();
  }

  onRegisterSuccess()
  {
    this.Login();
    this.onRegister.emit();
  }


  onLoginFail(error:ProblemDetails)
  {
    if(this.emailAddress == "" || this.password == "")
    {
      this.setErrorMessage("Email/password cannot be empty");
      return;
    }
    if(error.title == "Unauthorized")
    {
      this.setErrorMessage("Invalid username or password.");
      return;
    }
  }

  onRegisterFail(error:ProblemDetails)
  {
    if(this.emailAddress == "" || this.password == "")
    {
      this.setErrorMessage("Email/password cannot be empty");
      return;
    }
    let errorText = this.getRegisterErrorText(error);
    if(errorText != "")
    {
      this.setErrorMessage(errorText);
    }
  }

  setErrorMessage(msg:string)
  {
    this.currentErrorMessage = msg
      this.errorMessageClass = "errorMessage";
  }
  
  closeErrorMessage()
  {
    this.currentErrorMessage = "";
    this.errorMessageClass = "errorMessage closed";
  }

  getRegisterErrorText(error:ProblemDetails):string
  {
    let errors = Object.getOwnPropertyNames(error.errors).reverse();
    if(errors[0] == "InvalidEmail")
    {
      return "Email is invalid.";
    }
    if(errors[0] == "PasswordRequiresUpper")
    {
      return "Password requires at least one uppercase character";
    }
    if(errors[0] == "PasswordRequiresLower")
    {
      return "Password requires at least one lowercase character";
    }
    if(errors[0] == "PasswordRequiresDigit")
    {
      return "Password requires at least one digit";
    }
    if(errors[0] == "PasswordRequiresNonAlphanumeric")
    {
      return "Password requires at least one non-alphanumeric character";
    }
    if(errors[0] == "PasswordTooShort")
    {
      return "Password must be at least 6 characters";
    }

    return "";
  }
}
