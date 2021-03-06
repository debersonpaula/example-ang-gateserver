import { Routes } from '@angular/router';
import { HomePage } from './views/home';
import { TestComponent } from './views/test/test';
import { NotesEditor, NotesList } from './views/notes';
import { TrendsEditor, TrendsList } from './views/trends';
import { Reports } from './views/reports';

export const AppRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePage, data: {pagename: 'Home'}},
    {path: 'test', component: TestComponent, data: {pagename: 'Test'}},
    {path: 'notes', component: NotesList, data: {pagename: 'Notes List'}},
    {path: 'notes/:id', component: NotesEditor, data: {pagename: 'Notes Editor'}},
    {path: 'trends', component: TrendsList, data: {pagename: 'Trends List'}},
    {path: 'trends/:id', component: TrendsEditor, data: {pagename: 'Trends Editor'}},
    {path: 'reports', component: Reports, data: {pagename: 'Reports'}},
];