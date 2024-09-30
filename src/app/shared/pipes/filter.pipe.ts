import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from 'src/app/core/interfaces/todo.interface';
import { SearchCriteria } from '../interfaces/search-criteria.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(items: Todo[], searchInputs: SearchCriteria): Todo[] {
    if (!items) return [];
    if (!searchInputs) return items;

    const filteredItems = items.filter(item => {

      const matchesName = searchInputs.taskName 
      ? item.title.toLowerCase().includes(searchInputs.taskName.toLowerCase()) 
      : true;

      const matchesStatus = searchInputs.completed !== undefined && searchInputs.completed !== null
      ? item.completed.toString() === searchInputs.completed.toString()
      : true;

    
      return matchesName && matchesStatus
    })

    return filteredItems
  }

}
