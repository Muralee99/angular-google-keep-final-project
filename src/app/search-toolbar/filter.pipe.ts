import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../note';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    note: Note = new Note('', '', '', null, '', null, null);
  transform(items: any[], searchText: string): any[] {

    let filteredItems : any[] = new Array();
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toString().toLowerCase();

items.forEach((card) =>{
    this.note = card;
    let title = this.note.noteTitle.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    let content = this.note.noteContent.toString().toLowerCase().includes(searchText.toString().toLowerCase());

    if(title || content){
    return filteredItems.push(this.note);
    }
   
} )
return filteredItems;
   }
}