import { Component, ViewEncapsulation, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { TSessionComponent } from '../../components/session.component';
import { TSessionsService } from '../../services/sessions.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Sidenav extends TSessionComponent {
  private mediaMatcher: MediaQueryList = matchMedia('(max-width: 720px)');
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(SessionsService: TSessionsService, private _router: Router, zone: NgZone) {
    super(SessionsService);
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
    super.ngOnInit();
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
