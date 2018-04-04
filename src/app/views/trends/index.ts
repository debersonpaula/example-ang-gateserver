import { Component, Input  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TSessionComponent } from '../../components/session.component';
import { TTrend } from '../../struct/types';
import { modname } from '../../struct/enums';
import { TSessionsService } from '../../services/sessions.service';
import { MainService } from '../../services/main.service';


const API_SERVICE = '/trends';

@Component({
  selector: 'app-notes',
  templateUrl: './pageEditor.html'
})
export class TrendsEditor extends TSessionComponent {
  /** notes item */
  @Input() item: TTrend;
  error: string;
  // fieldDate = new FormControl('', [Validators.required]);
  // fieldValue = new FormControl('', [Validators.required]);
  

  /** Create NotesList instance */
  constructor ( SessionsService: TSessionsService,
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute) {
    super(SessionsService);
    this.item = {id: 0, date: '', value: ''};
  }

  OnSession() {
    this.get();
  }

  save() {
    if (this.item.date && this.item.value){
      if (this.item.id > 0) {
        this.patch();
      } else {
        this.post();
      }
    } else {
      // this.fieldValue.markAsTouched();
      // this.fieldDate.markAsTouched();
    }
  }

  private post() {
    const authid = this.session.tokenData.id.toString(),
          authtoken = this.session.tokenData.token.tokenId;
    
    this.service.httpPost(API_SERVICE, this.item, {authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.router.navigateByUrl('/trends');        
      } else if(err) {
        this.error = err.message;
      } else {
        this.error = 'ERROR UNDEFINED';
      }
    });
  }

  private patch() {
    const authid = this.session.tokenData.id.toString(),
      authtoken = this.session.tokenData.token.tokenId;
    
    this.service.httpPatch(API_SERVICE + '/' + this.item.id, this.item, {authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.router.navigateByUrl('/trends');        
      } else if(err) {
        this.error = err.message;
      } else {
        this.error = 'ERROR UNDEFINED';
      }
    });
  }

  private get() {
    const id = this.route.snapshot.paramMap.get('id'),
      authid = this.session.tokenData.id.toString(),
      authtoken = this.session.tokenData.token.tokenId;

    if (id != '0') {
      this.service.httpGet(API_SERVICE + '/' + id, {authid, authtoken, modname}, (res,err)=>{
        if (res.status == 200) {
          // this.item.id = res.data.id;
          // this.fieldDate.setValue(res.data.subject); 
          // this.fieldValue.setValue(res.data.message);  
          this.item = res.data; 
        } else if(err) {
          this.error = err.message;
        } else {
          this.error = 'ERROR UNDEFINED';
        }
      });
    } else {
      // this.item = {
      //   id: 0,
      //   date: 0,
      //   value: 0
      // };
    }
  }
}

@Component({
  selector: 'app-notes',
  templateUrl: './page.html'
})
export class TrendsList extends TSessionComponent {
  /** notes list */
  items: TTrend[];
  error: string;
  displayedColumns = ['id', 'date', 'value', 'options'];

  /** Create NotesList instance */
  constructor (SessionsService: TSessionsService, private service: MainService) {
    super(SessionsService);
    this.items = [];
    this.error = '';
  }

  /** Execute after on session */
  OnSession() {
    this.getList();
  }

  /** Load Notes list */
  private getList() {
    const authid = this.session.tokenData.id.toString(),
          authtoken = this.session.tokenData.token.tokenId;
    this.service.httpGet(API_SERVICE,{authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.items = res.data;
        this.error = '';
      } else {
        this.error = err.message;
      }
    });
  }

  /** Delete Item from List */
  delete(id: number) {
    const authid = this.session.tokenData.id.toString(),
          authtoken = this.session.tokenData.token.tokenId;
    this.service.httpDelete(API_SERVICE + '/' + id,{authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.getList()
        this.error = '';
      } else {
        this.error = err.message;
      }
    });
  }
}
