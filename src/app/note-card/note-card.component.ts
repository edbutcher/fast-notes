import { Component, OnInit, Input } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note: Note;

  constructor(private noteService: NoteService) { }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note).subscribe();
  }

  archiveNote(note: Note): void {
    this.note.isArchive = true;
    this.noteService.updateNote(note).subscribe();
  }

  unarchiveNote(note: Note): void {
    this.note.isArchive = false;
    this.noteService.updateNote(note).subscribe();
  }

  doneNote(note: Note) {
    this.note.isDone = true;
    this.noteService.updateNote(note).subscribe();
  }

  undoneNote(note: Note) {
    this.note.isDone = false;
    this.noteService.updateNote(note).subscribe();
  }

}
