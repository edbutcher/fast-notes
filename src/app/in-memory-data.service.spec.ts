import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';
import { Note } from './note';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(InMemoryDataService);
    expect(service).toBeTruthy();
  });

  it('should return `Notes` array in object', () => {
    service = TestBed.get(InMemoryDataService);
    expect(service.createDb().notes instanceof Array).toBeTruthy();
  });

  it('should return `id` with passed notes', () => {
    service = TestBed.get(InMemoryDataService);
    const notes = [{
      id: 1,
      title: 'json-server',
      text: 'Lorem, ipsum',
      isDone: false,
      isArchive: false
    },
    { id: 2,
      title: 'Uncopleted',
      text: 'Lorem, ipsum ',
      isDone: false,
      isArchive: false,
    },
    {
      id: 3,
      title: 'test',
      text: 'Lorem, ipsum',
      isDone: true,
      isArchive: false,
    }];

    expect(service.genId(notes)).toEqual(notes.length + 1);
  });

  it('should return `id` with passed empty notes array', () => {
    service = TestBed.get(InMemoryDataService);
    const notes = [];

    expect(service.genId(notes)).toEqual(11);
  });
});
