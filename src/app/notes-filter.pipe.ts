import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notesFilter'
})
export class NotesFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
