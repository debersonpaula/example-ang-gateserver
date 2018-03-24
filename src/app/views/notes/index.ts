import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TSessionComponent } from '../../components/session.component';
import { TNote } from '../../struct/types';
import { modname } from '../../struct/enums';
import { TSessionsService } from '../../services/sessions.service';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-notes',
  templateUrl: './pageEditor.html'
})
export class NotesEditor extends TSessionComponent {
  /** notes item */
  note: TNote;
  error: string;
  fieldSubject = new FormControl('', [Validators.required]);
  fieldMessage = new FormControl('', [Validators.required]);
  

  /** Create NotesList instance */
  constructor ( SessionsService: TSessionsService,
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute) {

    super(SessionsService);

    this.note = {
      id: 0,
      subject: '',
      message: ''
    };

    this.fieldSubject.valueChanges.subscribe( value => {
      this.note.subject = value;
    });

    this.fieldMessage.valueChanges.subscribe( value => {
      this.note.message = value;
    });
  }

  OnSession() {
    this.get();
  }

  save() {
    if (!this.fieldMessage.invalid && !this.fieldSubject.invalid){
      if (this.note.id > 0) {
        this.patch();
      } else {
        this.post();
      }
    } else {
      this.fieldMessage.markAsTouched();
      this.fieldSubject.markAsTouched();
    }
  }

  private post() {
    const authid = this.session.tokenData.id.toString(),
      authtoken = this.session.tokenData.token.tokenId;
    
    this.service.httpPost('/comments', this.note, {authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.router.navigateByUrl('/notes');        
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
    
    this.service.httpPatch('/comments/' + this.note.id, this.note, {authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.router.navigateByUrl('/notes');        
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
      this.service.httpGet('/comments/' + id, {authid, authtoken, modname}, (res,err)=>{
        if (res.status == 200) {
          this.note.id = res.data.id;
          this.fieldSubject.setValue(res.data.subject); 
          this.fieldMessage.setValue(res.data.message);   
        } else if(err) {
          this.error = err.message;
        } else {
          this.error = 'ERROR UNDEFINED';
        }
      });
    } else {
      this.note = {
        id: 0,
        subject: '',
        message: ''
      };
    }
  }
}

@Component({
  selector: 'app-notes',
  templateUrl: './page.html'
})
export class NotesList extends TSessionComponent {
  /** notes list */
  notes: TNote[];
  error: string;
  displayedColumns = ['id', 'subject', 'message', 'options'];

  /** Create NotesList instance */
  constructor (SessionsService: TSessionsService, private service: MainService) {
    super(SessionsService);
    this.notes = [];
    this.error = '';
  }

  /** Execute after on session */
  OnSession() {
    this.getNotes();
  }

  /** Load Notes list */
  private getNotes() {
    const authid = this.session.tokenData.id.toString(),
          authtoken = this.session.tokenData.token.tokenId;
    this.service.httpGet('/comments',{authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.notes = res.data;
        this.error = '';
      } else {
        this.error = err.message;
      }
    });
  }

  delete(id: number) {
    const authid = this.session.tokenData.id.toString(),
          authtoken = this.session.tokenData.token.tokenId;
    this.service.httpDelete('/comments/' + id,{authid, authtoken, modname},(res,err)=>{
      if (res.status == 200) {
        this.getNotes()
        this.error = '';
      } else {
        this.error = err.message;
      }
    });
  }
}
