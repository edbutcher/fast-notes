import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { NoteComponent } from './note.component';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { of } from 'rxjs';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let noteService: NoteService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      providers: [
        NoteService,
        Location,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    });

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
    location = TestBed.get(Location);
    fixture.detectChanges();
  }));

  it('goBack', async(() => {
    spyOn(location, 'back');
    component.goBack();

    expect(location.back).toHaveBeenCalled();
  }));

  it('delete note with deleteNote method', fakeAsync(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    };
    component.note = mockNote;
    spyOn(noteService, 'deleteNote').and.returnValue(of());
    component.deleteNote();
    tick();

    expect(noteService.deleteNote).toHaveBeenCalledWith(mockNote);
  }));

  it('save note with save method', async(() => {
    const mockNote: Note = {
      id: 1,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: false,
    };
    component.note = mockNote;
    spyOn(noteService, 'updateNote').and.returnValue(of());
    component.save();

    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
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
    component.archiveNote();

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
    component.unarchiveNote();

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
    component.doneNote();

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
    component.undoneNote();

    expect(component.note.isDone).toBeFalsy();
    expect(noteService.updateNote).toHaveBeenCalledWith(mockNote);
  }));
});
