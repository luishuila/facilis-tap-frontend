import { Component, Input, OnInit, EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  standalone: false,
})
export class BtnComponent implements OnInit {
  @Input() label: string = 'Button';  
  @Input() icon: string = '';        
  @Input() color: string = 'primary'; 
  @Input() expand: 'full' | 'block' | 'default' = 'block';  
  @Input() customClass: string = '';  
  @Input() disabled: boolean = false; 
  @Output() clicked = new EventEmitter<void>(); 
  constructor() { }


  onClick() {
    console.log('Botón clickeado'); 
    this.clicked.emit();
  }
  ngOnInit() {}
}
