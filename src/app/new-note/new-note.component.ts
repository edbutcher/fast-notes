import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  note;

  constructor(
    private location: Location,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    this.note = {
      title: "",
      text: "",
      isDone: false,
      isArchive: false
    }
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.noteService.addNote(this.note as Note)
      .subscribe(() => this.goBack());
  }
}
