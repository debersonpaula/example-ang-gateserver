import { Component, OnInit } from '@angular/core';
import { TSessionComponent } from '../../components/session.component';
import { MatDialog } from '@angular/material';
import { TSessionsService } from '../../services/sessions.service';
import { LoginComponent, RegisterComponent } from '../auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar extends TSessionComponent {
  constructor(SessionsService: TSessionsService, public dialog: MatDialog) {
    super(SessionsService);
  }

  openLogin() {
    let dialogRef = this.dialog.open(LoginComponent, {width: '250px'});
  }

  openRegister() {
    let dialogRef = this.dialog.open(RegisterComponent, {width: '290px'});
  }
}
