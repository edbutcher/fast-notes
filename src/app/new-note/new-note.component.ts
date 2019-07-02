import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  note;

  constructor(
    private router: Router,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    this.note = {
      title: '',
      text: '',
      isDone: false,
      isArchive: false
    };
  }

  goBack(): void {
    this.router.navigate(['/notes']);
  }

  add(): void {
    this.noteService.addNote(this.note as Note)
      .subscribe(() => this.goBack());
  }
}
