import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MainService } from './main.service';
import { TSession } from '../struct/types';
import { authkey, authtools } from '../struct/enums';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TSessionsService {

  // session content
  private _sessionSource = new BehaviorSubject<TSession | undefined>(undefined);
  private _session = this._sessionSource.asObservable();

  constructor(private service: MainService) { }

  /** get current session data */
  get session() {
    return this._session;
  }

  /** check sessions and store in the session data */
  createSession() {
    const tokenData = this.service.getAuth();
    if (tokenData) {
      const authtoken = tokenData.token.tokenId;
      const authid = tokenData.id.toString();
      const authtool = authtools.session;
      this.service.httpGet('', {authkey, authtool, authtoken, authid},
      (res, error) => {
        if (res.status >= 200 && res.status <= 207) {
          const session: TSession = {
            userData: res.data,
            tokenData,
          };
          this._sessionSource.next(session);
        } else if (error){
          this.destroySession();
        }
      });
    }
  }

  /** destroy session and log out the user */
  destroySession(done?: Function) {
    const tokenData = this.service.getAuth();
    if (tokenData) {
      const authtoken = tokenData.token.tokenId;
      const authid = tokenData.id.toString();
      const authtool = authtools.logout;
      this.service.httpGet('', {authkey, authtool, authtoken, authid},
      (value, error) => {
        this._sessionSource.next(undefined);
        this.service.delAuth();
        done && done();
      });
    }
  }

}
