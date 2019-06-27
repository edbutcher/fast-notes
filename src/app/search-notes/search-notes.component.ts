import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit {

  @Output() changeShowSearchResults = new EventEmitter<boolean>();
  private searchValue = new Subject<string>();
  notes: Note[];
  searchShow = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.noteService.searchNotes(term)),
      tap(notes => this.setSearchShow(notes)),
    ).subscribe((notes: Note[]) => this.notes = notes);
  }

  getSearchNotes(term: string): void {
    this.searchValue.next(term);
  }

  setSearchShow(notes: Note[]): void {
    this.searchShow = notes.length > 0;
    this.changeShowSearchResults.emit(this.searchShow);
  }

}
