import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(NoteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCompletedNotes should return value from observable', () => {
    service.getCompletedNotes()
      .subscribe(notes => {
        expect(notes instanceof Array).toBeTruthy();
      });
    const notesUrl = 'api/notes';
    const req = httpTestingController.expectOne(notesUrl);

    expect(req.request.method).toEqual('GET');

    req.flush({});
  });
});
