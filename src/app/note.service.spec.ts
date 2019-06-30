import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoteService } from './note.service';
import { Note } from './note';

describe('NoteService', () => {
  let httpTestingController: HttpTestingController;
  let noteService: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    noteService = TestBed.get(NoteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return Completed notes (HttpClient called once)', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'copleted',
        text: 'Lorem, ipsum',
        isDone: true,
        isArchive: false
      },
      {
        id: 2,
        title: 'uncopleted',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: false,
      },
    ];

    noteService.getCompletedNotes().subscribe(
      notes => expect(notes).toEqual([mockNotes[0]])
    );
    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('should return Uncompleted notes (HttpClient called once)', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'uncopleted',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: false
      },
      {
        id: 2,
        title: 'copleted',
        text: 'Lorem, ipsum',
        isDone: true,
        isArchive: false,
      },
    ];

    noteService.getUncompletedNotes().subscribe(
      notes => expect(notes).toEqual([mockNotes[0]])
    );
    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('should return Archived notes', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'not archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: false,
      },
    ];
    noteService.getArchivedNotes().subscribe(
      notes => expect(notes).toEqual([mockNotes[0]])
    );
    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('should return Note from getNoteNo404', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'not archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: false,
      },
    ];
    noteService.getNoteNo404(1).subscribe(
      note => expect(note).toEqual(mockNotes[0])
    );
    const req = httpTestingController.expectOne(`api/notes/?id=${mockNotes[0].id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('should return Note from getNote', () => {
    const mockNote: Note = {
      id: 1,
      title: 'archive',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true
    };
    noteService.getNote(mockNote.id).subscribe(
      note => expect(note).toEqual(mockNote)
    );
    const req = httpTestingController.expectOne(`api/notes/${mockNote.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockNote);
  });

  it('should return Notes includes match sting from searchNotes', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'test',
        text: 'test',
        isDone: false,
        isArchive: false,
      },
    ];
    noteService.searchNotes(mockNotes[1].title).subscribe(
      notes => expect(notes).toEqual([mockNotes[1]])
    );
    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('returns an empty array if passed space in search call', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'test',
        text: 'test',
        isDone: false,
        isArchive: false,
      },
    ];
    const noMatchSearch = ' ';
    noteService.searchNotes(noMatchSearch).subscribe(
      notes => expect(notes).toEqual([])
    );
    httpTestingController.expectNone('api/notes');
  });

  it('add new note with post request', () => {
    const newNote = {
      title: 'archive',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true
    };

    noteService.addNote(newNote as Note).subscribe();
    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toEqual('POST');
  });

  it('delete note with Note passed', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'test',
        text: 'test',
        isDone: false,
        isArchive: false,
      },
    ];

    noteService.deleteNote(mockNotes[0]).subscribe();
    const req = httpTestingController.expectOne(`api/notes/${mockNotes[0].id}`);
    expect(req.request.method).toEqual('DELETE');
  });

  it('delete note with Note id passed', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'test',
        text: 'test',
        isDone: false,
        isArchive: false,
      },
    ];

    noteService.deleteNote(mockNotes[0].id).subscribe();
    const req = httpTestingController.expectOne(`api/notes/${mockNotes[0].id}`);
    expect(req.request.method).toEqual('DELETE');
  });

  it('update note with new Note object passed', () => {
    const mockNote: Note = {
      id: 1,
      title: 'archive',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true
    };

    noteService.updateNote(mockNote).subscribe();
    const req = httpTestingController.expectOne(`api/notes`);
    expect(req.request.method).toEqual('PUT');
  });

  // it('should call handleError', () => {
  //   const errorOperation = 'errorOperation';
  //   const errorString = 'errorString';

  //   const answer = noteService['handleError'](errorOperation, errorString)
  //   answer.subscribe(error => expect(error).toThrowError());
  // });
});


