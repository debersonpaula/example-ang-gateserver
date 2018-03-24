import { Component, OnInit } from '@angular/core';
import { TSessionsService } from '../services/sessions.service';
import { TSession } from '../struct/types';

@Component({
    selector: 'app-session',
    template: ''
})
export class TSessionComponent implements OnInit {
    /** session content */
    session: TSession;

    /** constructor */
    constructor(public SessionsService: TSessionsService) {
    }

    /** initialize session variable */
    ngOnInit() {
        // update session for every changes in sessions
        this.SessionsService.session.subscribe( data => {
            if (data) {
                // define session data
                this.session = data;
                // executes OnSession
                this.OnSession();
            }
        });
        // executes OnRun
        this.OnRun();
    }
    /** execute after OnInit */
    OnRun() {}

    /** execute after session defintion */
    OnSession() {}

    /** Execute Logout action */
    doLogout(): void {
        this.SessionsService.destroySession(function(){
            window.location.replace('/');
        });
    }
}