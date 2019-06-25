import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit {

  private searchValue = new Subject<string>();
  notes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.notes$ = this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.noteService.searchNotes(term)),
    );
  }

  getSearchNotes(term: string): void {
    this.searchValue.next(term);
  }

}
