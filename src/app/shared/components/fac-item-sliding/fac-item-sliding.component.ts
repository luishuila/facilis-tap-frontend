import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { pin, share, trash } from 'ionicons/icons';

@Component({
  selector: 'fac-item-sliding',
  templateUrl: './fac-item-sliding.component.html',
  styleUrls: ['./fac-item-sliding.component.scss'],
  standalone: false,
})
export class FacItemSlidingComponent  implements OnInit {
  @Input() items:any[] = [];
 
  @Input() textExp:string = '';
  @Input() textExpInit:string = '';
  @Input() textExpP:string = '';
  @Input() textExpPInit:string = '';
  
  @Input() valueOptional:string = '';
  @Input() valueOptionalH: string = '';
  @Input() valueOptionalP: string = '';
  @Input() valueOptionalPA: string = '';
  constructor() {
        addIcons({ pin, share, trash });
   }

  ngOnInit() {
    console.log(this.items)
  }
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
}
