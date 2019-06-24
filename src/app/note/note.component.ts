import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

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
    this.noteService.getNoteNo404(id)
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.noteService.updateNote(this.note)
      .subscribe(() => this.goBack());
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note)
      .subscribe(() => this.goBack());
  }

  archiveNote(): void {
    this.note.isArchive = true;
    this.noteService.updateNote(this.note).subscribe();
  }

  unarchiveNote(): void {
    this.note.isArchive = false;
    this.noteService.updateNote(this.note).subscribe();
  }

  doneNote() {
    this.note.isDone = true;
    this.noteService.updateNote(this.note).subscribe();
  }

  undoneNote() {
    this.note.isDone = false;
    this.noteService.updateNote(this.note).subscribe();
  }

}
