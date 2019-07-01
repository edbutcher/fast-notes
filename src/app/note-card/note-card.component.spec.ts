import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NoteCardComponent } from './note-card.component';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { of } from 'rxjs';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let noteService: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCardComponent ],
      providers: [ NoteService ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    });

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
  }));

  it('delete note with deleteNote method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    };
    spyOn(noteService, 'deleteNote').and.returnValue(of());
    component.deleteNote(mockNote);

    expect(noteService.deleteNote).toHaveBeenCalledWith(mockNote);
  }));

  it('archiveNote note with archiveNote method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: false,
    };
    component.note = mockNote;
    spyOn(noteService, 'updateNote').and.returnValue(of());
    component.archiveNote(mockNote);

    expect(component.note.isArchive).toBeTruthy();
    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
  }));

  it('unarchiveNote note with unarchiveNote method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    };
    component.note = mockNote;
    spyOn(noteService, 'updateNote').and.returnValue(of());
    component.unarchiveNote(mockNote);

    expect(component.note.isArchive).toBeFalsy();
    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
  }));

  it('done note with doneNote method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    };
    component.note = mockNote;
    spyOn(noteService, 'updateNote').and.returnValue(of());
    component.doneNote(mockNote);

    expect(component.note.isDone).toBeTruthy();
    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
  }));

  it('undone note with undoneNote method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: true,
      isArchive: true,
    };
    component.note = mockNote;
    spyOn(noteService, 'updateNote').and.returnValue(of());
    component.undoneNote(mockNote);

    expect(component.note.isDone).toBeFalsy();
    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
  }));
});
