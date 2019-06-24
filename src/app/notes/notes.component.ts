import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  private searchValue = new Subject<string>();
  notes$: Observable<Note[]>;
  uncompletedNotes: Note[];
  completedNotes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
    this.notes$ = this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.noteService.searchNotes(term)),
    );
  }

  getNotes(): void {
    this.noteService.getUncompletedNotes()
      .subscribe(notes => this.uncompletedNotes = notes);

    this.noteService.getCompletedNotes()
      .subscribe(notes => this.completedNotes = notes);
  }

  getSearchNotes(term: string): void {
    this.searchValue.next(term);
  }

}
