import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { NoteService } from '../note.service';
import { SearchNotesComponent } from './search-notes.component';
import { NoteCardComponent } from '../note-card/note-card.component';

describe('SearchNotesComponent', () => {
  let component: SearchNotesComponent;
  let fixture: ComponentFixture<SearchNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteCardComponent,
        SearchNotesComponent,
      ],
      providers: [ NoteService ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
