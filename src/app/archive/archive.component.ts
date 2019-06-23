import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getArchivedNotes()
    .subscribe(notes => this.notes = notes);
  }

}
