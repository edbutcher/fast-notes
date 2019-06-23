import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  note: Note;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    this.getNote();
  }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.noteService.updateNote(this.note)
      .subscribe(() => this.goBack());
  }

}
