import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fac-item-list',
  templateUrl: './fac-item-list.component.html',
  styleUrls: ['./fac-item-list.component.scss'],
  standalone: false,
})
export class FacItemListComponent  implements OnInit {
  @Input() items:any[] = [];
 
  @Input() textExp:string = '';
  @Input() textExpInit:string = '';
  @Input() textExpP:string = '';
  @Input() textExpPInit:string = '';
  
  @Input() valueOptional:string = '';
  @Input() valueOptionalH: string = '';
  @Input() valueOptionalP: string = '';
  @Input() valueOptionalPA: string = '';

  @Output() clicked = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit() {}
  getNestedValue(obj: any, path: string): any {
    try {
      return path.split('.').reduce((acc, part) => {
        const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
        if (arrayMatch) {
          const [, prop, index] = arrayMatch;
          return acc?.[prop]?.[+index];
        }
        return acc?.[part];
      }, obj) ?? '';
    } catch {
      return '';
    }
  }
  onClick(id:number) {
    console.log('Botón clickeado',id); 
    this.clicked.emit(id);
  }
}
