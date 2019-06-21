import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Note } from './note';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesUrl = 'api/notes';

  constructor(private http: HttpClient) { }

  private log(message: string) {
    console.log(`NoteService: ${message}`);
  }

  getNotes (): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }
 
  /** GET hero by id. Return `undefined` when id not found */
  // getHeroNo404<Data>(id: number): Observable<Hero> {
  //   const url = `${this.notesUrl}/?id=${id}`;
  //   return this.http.get<Hero[]>(url)
  //     .pipe(
  //       map(heroes => heroes[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<Hero>(`getHero id=${id}`))
  //     );
  // }
 
  /** GET hero by id. Will 404 if id not found */
  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap(_ => this.log(`fetched note id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }
 
  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.notesUrl}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }
 
  // //////// Save methods //////////
 
  // /** POST: add a new hero to the server */
  // addHero (hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.notesUrl, hero, httpOptions).pipe(
  //     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
 
  // /** DELETE: delete the hero from the server */
  // deleteHero (hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.notesUrl}/${id}`;
 
  //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }
 
  // /** PUT: update the hero on the server */
  // updateHero (hero: Hero): Observable<any> {
  //   return this.http.put(this.notesUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }
 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
