import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note: Note;
  @Output() updateNotes = new EventEmitter<void>();

  constructor(private noteService: NoteService) { }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note)
      .subscribe(() => this.updateNotes.emit());
  }

  archiveNote(note: Note): void {
    this.note.isArchive = true;
    this.noteService.updateNote(note)
      .subscribe(() => this.updateNotes.emit());
  }

  unarchiveNote(note: Note): void {
    this.note.isArchive = false;
    this.noteService.updateNote(note)
      .subscribe(() => this.updateNotes.emit());
  }

  doneNote(note: Note) {
    this.note.isDone = true;
    this.noteService.updateNote(note)
      .subscribe(() => this.updateNotes.emit());
  }

  undoneNote(note: Note) {
    this.note.isDone = false;
    this.noteService.updateNote(note)
      .subscribe(() => this.updateNotes.emit());
  }

}
