import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archivedNotes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.archivedNotes$ = this.noteService.getArchivedNotes();
  }

  updateNotes(): void {
    this.noteService.getNotes();
  }

}
