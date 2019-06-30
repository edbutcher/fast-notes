import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NewNoteComponent } from './new-note.component';
import { NoteService } from '../note.service';

fdescribe('NewNoteComponent', () => {
  let component: NewNoteComponent;
  let fixture: ComponentFixture<NewNoteComponent>;
  let noteService: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNoteComponent ],
      providers: [ NoteService ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        FormsModule,
        RouterModule,
      ],
    });

    fixture = TestBed.createComponent(NewNoteComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
