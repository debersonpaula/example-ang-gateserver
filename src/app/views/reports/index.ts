import { Component, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TSessionComponent } from '../../components/session.component';
import { TTrend } from '../../struct/types';
import { modname } from '../../struct/enums';
import { TSessionsService } from '../../services/sessions.service';
import { MainService } from '../../services/main.service';

import * as Chart from 'chart.js';

const API_SERVICE = '/trends';

@Component({
  selector: 'app-report',
  templateUrl: './pageReport.html'
})
export class Reports extends TSessionComponent implements AfterViewInit {

  private canvas: any;
  private ctx: any;
  items: TTrend[] = [];

  /** Create NotesList instance */
  constructor ( SessionsService: TSessionsService,
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute) {
    super(SessionsService);
  }

  OnSession() {
    // this.get();
    // var myChart = new Chart(ctx, {...});
    
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById("myChart");
    // this.ctx = this.canvas.getContext('2d');

    console.log(this.canvas);

    // this.items = [
    //   {id: 1, date: "04/04/2018", value: "10"},
    //   {id: 2, date: "05/04/2018", value: "15"},
    //   {id: 3, date: "06/04/2018", value: "13"},
    // ];

    // var myLineChart = new Chart(this.ctx, {
    //   type: 'line',
    //   data: this.items,
    // });
  }
}