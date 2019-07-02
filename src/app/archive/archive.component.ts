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

  archiveddNotes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.archiveddNotes$ = this.noteService.getArchivedNotes();
  }

}
