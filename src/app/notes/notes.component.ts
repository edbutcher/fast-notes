import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  uncompletedNotes: Note[];
  completedNotes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getUncompletedNotes()
      .subscribe(notes => this.uncompletedNotes = notes);

    this.noteService.getCompletedNotes()
      .subscribe(notes => this.completedNotes = notes);
  }

}
