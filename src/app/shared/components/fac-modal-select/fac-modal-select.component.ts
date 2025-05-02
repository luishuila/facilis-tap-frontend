import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';


@Component({
  selector: 'fac-modal-select',
  templateUrl: './fac-modal-select.component.html',
  styleUrls: ['./fac-modal-select.component.scss'],
  standalone: false,
})

export class FacModalSelectComponent  implements OnInit {
  @Input() items: any[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';
  @Input() textField: string = 'text';   
  @Input() valueField: string = 'value'; 
  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredItems: any[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterList(inputElement.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined || searchQuery.trim() === '') {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => item[this.textField].toLowerCase().includes(normalizedQuery));
    }
  }

  isChecked(value: string): boolean {
    return this.workingSelectedValues.includes(value);
  }

  checkboxChange(event: CustomEvent<{ checked: boolean; value: string }>) {
    const { checked, value } = event.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((item) => item !== value);
    }
  }
}