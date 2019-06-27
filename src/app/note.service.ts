import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesUrl = 'api/notes';

  constructor(private http: HttpClient) { }

  getCompletedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        map(
          (notes: Note[]) => notes.filter(note => !note.isArchive && note.isDone )
        ),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  getUncompletedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        map(
          (notes: Note[]) => notes.filter(note => !note.isArchive && !note.isDone )
        ),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        map(
          (notes: Note[]) => notes.filter(note => note.isArchive)
        ),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  getNoteNo404<Data>(id: number): Observable<Note> {
    const url = `${this.notesUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
      .pipe(
        map(notes => notes[0]),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }

  searchNotes(term: string): Observable<Note[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Note[]>(this.notesUrl).pipe(
      map(
        (notes: Note[]) => notes.filter(
          note => note.title.includes(term) || note.text.includes(term)
        )
      ),
      catchError(this.handleError<Note[]>('searchNotes', []))
    );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      catchError(this.handleError<Note>('addNote'))
    );
  }

  deleteNote(note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, httpOptions).pipe(
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, httpOptions).pipe(
      catchError(this.handleError<any>('updateNote'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
