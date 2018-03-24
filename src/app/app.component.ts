import { Component, ViewEncapsulation } from '@angular/core';
import { TSessionComponent } from './components/session.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends TSessionComponent{
  OnRun() {
    this.SessionsService.createSession();
  }
}
