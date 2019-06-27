import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  uncompletedNotes$: Observable<Note[]>;
  completedNotes$: Observable<Note[]>;
  showSearchResults = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.uncompletedNotes$ = this.noteService.getUncompletedNotes();
    this.completedNotes$ = this.noteService.getCompletedNotes();
  }

  changeShowSearchResults(showSearchResults): void {
    this.showSearchResults = showSearchResults;
  }
}
