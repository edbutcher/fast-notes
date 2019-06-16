import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { ArchiveComponent } from './archive/archive.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesComponent,
  },
  { path: '',
    redirectTo: '/notes',
    pathMatch: 'full'
  },
  {
    path: 'notes/:id',
    component: NoteComponent,
  },
  {
    path: 'archive',
    component: ArchiveComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
