import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router, RoutesRecognized  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Header {
  @Output() toggleSidenav = new EventEmitter<void>();

  currentPage: string;

  constructor(private _router: Router) {
    _router.events.subscribe( event => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;
        this.currentPage = route.data.pagename;
      }
    });
  }
}
