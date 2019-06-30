import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { ArchiveComponent } from './archive.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NoteService } from '../note.service';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let noteService: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveComponent, NoteCardComponent ],
      providers: [ NoteService ],
      imports: [ RouterModule, HttpClientModule, ],
    });

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
  }));



  it('NoteService returns array of notes on init', () => {
    const fakeNotes = [
      {
        id: 1,
        title: 'archive',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true
      },
      {
        id: 2,
        title: 'archive 2',
        text: 'Lorem, ipsum',
        isDone: false,
        isArchive: true,
      },
    ];
    spyOn(noteService, 'getArchivedNotes').and.returnValue(of(fakeNotes));
    component.ngOnInit();

    expect(component.notes).toEqual(fakeNotes);
    expect(noteService.getArchivedNotes).toHaveBeenCalled();
  });
});
