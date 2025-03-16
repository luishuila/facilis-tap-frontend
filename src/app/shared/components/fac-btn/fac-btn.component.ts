import { Component, Input, OnInit, EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'fac-btn',
  templateUrl: './fac-btn.component.html',
  styleUrls: ['./fac-btn.component.scss'],
  standalone: false,
})
export class FacBtnComponent implements OnInit {
  @Input() label: string = 'Button';  
  @Input() icon: string = '';        
  @Input() color: string = 'primary'; 
  @Input() expand: 'full' | 'block' | 'default' = 'block';  
  @Input() customClass: string = '';  
  @Input() disabled: boolean = false; 
  @Output() clicked = new EventEmitter<void>(); 
  @Input() type: string = 'submit';  
  constructor() { }


  onClick() {
    console.log('Botón clickeado'); 
    this.clicked.emit();
  }
  ngOnInit() {}
}
