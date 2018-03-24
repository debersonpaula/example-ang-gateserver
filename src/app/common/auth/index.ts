import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TUserLogin, TUser } from '../../struct/types';
import { authkey, authtools } from '../../struct/enums';
import { MainService } from '../../services/main.service';

/*=========================================================================*/
/*=== Login ===============================================================*/
/*=========================================================================*/
@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class LoginComponent {
  UserLogin: TUserLogin;
  NotifyMessage: string;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private service: MainService) {
      this.UserLogin = {userlogin: '', userpass: ''};
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitLogin(): void {
    const authtool = authtools.login;
    this.service.httpPost('', this.UserLogin, {authkey, authtool}, (res, err) => {
      if (res.status >= 200 && res.status <= 207) {
        this.NotifyMessage = '';
        this.service.setAuth(res.data);
        window.location.replace('/');
      } else {
        this.NotifyMessage = err.message;
      }
    });
  }
}
/*=========================================================================*/
/*=== Register ============================================================*/
/*=========================================================================*/
@Component({
  selector: 'app-register',
  templateUrl: './register.html'
})
export class RegisterComponent {
  UserRegister: TUser;
  NotifyMessage: string;
  PassConfirmation: string;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private service: MainService) {
      this.UserRegister = {userlogin: '', userpass: '', firstname: '', lastname: ''};
      this.PassConfirmation = '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitRegister(): void {
    const authtool = authtools.register;
    if (this.PassConfirmation === this.UserRegister.userpass && this.UserRegister.userpass != '') {
      this.service.httpPost('', this.UserRegister, {authkey, authtool}, (res, err) => {
        if (res.status >= 200 && res.status <= 207) {
          this.NotifyMessage = '';
          this.service.setAuth(res.data);
          window.location.replace('/');
        } else {
          this.NotifyMessage = err.message;
        }
      });
    } else {
      this.NotifyMessage = 'Password confirmation should be the same';
    }
  }
}
