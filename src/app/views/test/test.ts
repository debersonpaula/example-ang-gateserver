import { Component } from '@angular/core';
import { TRouteData } from '../../struct/types';

import { TSessionComponent } from '../../components/session.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.html'
})
export class TestComponent extends TSessionComponent {
}

export const TestData: TRouteData = {caption: 'Test', comp: TestComponent, hideMenu: false, href: 'test'};
