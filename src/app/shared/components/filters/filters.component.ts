import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchCriteria } from '../../interfaces/search-criteria.interface';

@Component({
  selector: 'filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @Output() filtersChanged = new EventEmitter<any>(); 

  searchCriteria: SearchCriteria = {
    taskName: '',
    completed: undefined,
  }

  onFilter() {
    this.filtersChanged.emit(this.searchCriteria);
  }
}
