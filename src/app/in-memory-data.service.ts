import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Note } from './note';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const notes = [
      {
        id: 1,
        title: 'json-server',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        isDone: false,
        isArchive: false
      },
      {id: 2,
        title: 'Uncopleted',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: false,
      },
      {
        id: 3,
        title: 'Copletedasdfasfdasdfasf asfasfasfsdfsdff',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: false,
      },
      {
        id: 4,
        title: 'test 2',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: true,
      },
      {
        id: 5,
        title: 'test 3',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: true,
      },
      {
        id: 6,
        title: 'json-server',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: false
      },
      {id: 7,
        title: 'test',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: false,
      },
      {
        id: 8,
        title: 'another note',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: false,
      },
      {
        id: 9,
        title: 'test 2',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: true,
      },
      {
        id: 10,
        title: 'test 3',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: true,
      },
      {
        id: 11,
        title: 'json-server',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: false
      },
      {id: 12,
        title: 'test',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: false,
      },
      {
        id: 13,
        title: 'another note',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: false,
      },
      {
        id: 14,
        title: 'test 2',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: false,
        isArchive: true,
      },
      {
        id: 15,
        title: 'test 3',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: true,
      },
      {
        id: 16,
        title: 'test 3',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ad minus itaque voluptatem nisi iure, ' +
        'tempore beatae quia vel veritatis quam quibusdam asperiores error commodi tempora unde dolorum architecto perspiciatis.',
        isDone: true,
        isArchive: true,
      },
    ];
    return {notes};
  }

  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}
