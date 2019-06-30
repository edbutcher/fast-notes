import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';

import { NotesComponent } from './notes.component';
import { NoteService } from '../note.service';
import { SearchNotesComponent } from '../search-notes/search-notes.component';
import { NoteCardComponent } from '../note-card/note-card.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let noteService: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotesComponent,
        SearchNotesComponent,
        NoteCardComponent,
      ],
      providers: [ NoteService ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        RouterModule,
      ],
    });

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
  }));

  it('should change `showSearchResults` to true', () => {
    component.ngOnInit();

    expect(component.showSearchResults).toBeFalsy();

    component.changeShowSearchResults(true);

    expect(component.showSearchResults).toBeTruthy();
  });

  it('set array of completed notes to completedNotes$', () => {
    const complitedNotes = [{
      id: 1,
      title: 'Completed',
      text: 'Lorem, ipsum',
      isDone: true,
      isArchive: true
    }];
    spyOn(noteService, 'getCompletedNotes').and.returnValue(of(complitedNotes));
    component.ngOnInit();

    component.completedNotes$.subscribe(
      notes => expect(notes).toEqual(complitedNotes)
    );
    expect(noteService.getCompletedNotes).toHaveBeenCalled();
  });

  it('set array of uncompleted notes on init', () => {
    const uncomplitedNotes = [{
      id: 2,
      title: 'Uncompleted',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: true,
    }];
    spyOn(noteService, 'getUncompletedNotes').and.returnValue(of(uncomplitedNotes));
    component.ngOnInit();

    component.uncompletedNotes$.subscribe(
      notes => expect(notes).toEqual(uncomplitedNotes)
    );
    expect(noteService.getUncompletedNotes).toHaveBeenCalled();
  });
});
