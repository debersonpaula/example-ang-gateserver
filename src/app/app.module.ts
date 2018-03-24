import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// materials
import {
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSidenavModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';

// services and library
import { MainService } from './services/main.service';
import { TSessionsService } from './services/sessions.service';
import { TSessionComponent } from './components/session.component';

// components and modules
import { AppComponent } from './app.component';
import { AppRoutes } from './routes';
import { Navbar } from './common/navbar';
import { LoginComponent, RegisterComponent } from './common/auth';
import { Sidenav } from './common/sidenav';
import { Footer } from './common/footer';
import { Header } from './common/header';

// views
import { HomePage } from './views/home';
import { TestComponent } from './views/test/test';
import { NotesEditor, NotesList } from './views/notes';

@NgModule({
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    TSessionComponent,
    Navbar, Sidenav, Footer, Header,
    HomePage,
    LoginComponent, RegisterComponent,
    TestComponent,
    NotesEditor, NotesList
  ],
  imports: [
    // angular modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    // router
    RouterModule.forRoot(AppRoutes),
    // materials
    MaterialModule
  ],
  entryComponents: [LoginComponent, RegisterComponent],
  providers: [MainService, TSessionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
