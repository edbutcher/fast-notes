import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NewNoteComponent } from './new-note.component';
import { NoteService } from '../note.service';
import { routes } from '../app-routing.module';
import { NotesComponent } from '../notes/notes.component';
import { NoteComponent } from '../note/note.component';
import { ArchiveComponent } from '../archive/archive.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { SearchNotesComponent } from '../search-notes/search-notes.component';
import { of } from 'rxjs';
import { Note } from '../note';

describe('NewNoteComponent', () => {
  let component: NewNoteComponent;
  let fixture: ComponentFixture<NewNoteComponent>;
  let noteService: NoteService;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewNoteComponent,
        ArchiveComponent,
        NoteComponent,
        NotesComponent,
        PageNotFoundComponent,
        NoteCardComponent,
        SearchNotesComponent,
      ],
      providers: [ NoteService ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        MatFormFieldModule,
      ],
    });

    fixture = TestBed.createComponent(NewNoteComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  it('set initial note in component', () => {
    const initialNote = {
      title: '',
      text: '',
      isDone: false,
      isArchive: false
    };
    component.ngOnInit();

    expect(component.note).toEqual(initialNote);
  });

  it('add new note with addNote service call', () => {
    const newNote = {
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    };
    spyOn(noteService, 'addNote').and.returnValue(of(newNote as Note));;
    component.ngOnInit();
    component.note = newNote;
    component.add();

    expect(noteService.addNote).toHaveBeenCalledWith(newNote);
  });
});
