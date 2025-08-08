import { Component,  OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss'],
  standalone: false,
})
export class AppointmentScheduleComponent implements    OnInit{
   selectedTab = 'cita';

   @ViewChild('daySegment', { static: false }) daySegment: any;
   private daysInitialized = false;
 
 
   activeDayValue: string = '';
   days: { name: string, date: number, fullDate: Date, short: string, active: boolean }[] = [];
   tasks = [
     {
       title: 'Dinner and Daisy',
       time: '1:00 PM',
       subtitle: 'with Tina',
       color: '#fc5c65',
       tag: 'Tina'
     },
     {
       title: 'Attend The Meeting',
       time: '3:00 PM',
       subtitle: 'The annual revenue reached 5.324 billion US dollars.',
       color: '#fd9644',
       tag: 'Work'
     },
     {
       title: 'See A Movie',
       time: '6:00 PM',
       subtitle: 'with girlfriend. Pay attention to my love.',
       color: '#8854d0',
       tag: 'Leisure'
     },
     {
       title: 'Birthday Party',
       time: '9:00 PM',
       subtitle: '',
       color: '#f7b731',
       tag: 'Joy'
     },
     {
      title: 'Dinner and Daisy',
      time: '1:00 PM',
      subtitle: 'with Tina',
      color: '#fc5c65',
      tag: 'Tina'
    },
    {
      title: 'Attend The Meeting',
      time: '3:00 PM',
      subtitle: 'The annual revenue reached 5.324 billion US dollars.',
      color: '#fd9644',
      tag: 'Work'
    },
    {
      title: 'See A Movie',
      time: '6:00 PM',
      subtitle: 'with girlfriend. Pay attention to my love.',
      color: '#8854d0',
      tag: 'Leisure'
    },
    {
      title: 'Birthday Party',
      time: '9:00 PM',
      subtitle: '',
      color: '#f7b731',
      tag: 'Joy'
    }
   ];
   
 
     constructor() {
      
     }
 
     ngOnInit() {
       if (!this.daysInitialized) {
         this.generateNext30Days();
         this.daysInitialized = true;
       }
     }
 
    
 
     generateNext30Days() {
       this.days = [];  // <--- SOLUCIÓN AQUÍ
     
       const today = new Date();
     
       for (let i = 0; i <= 30; i++) {
         const date = new Date(today);
         date.setDate(today.getDate() + i);
     
         const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
         const dayNumber = date.getDate();
         const short = dayName.toLowerCase();
     
         const isActive = i === 0;
     
         if (isActive) {
           this.activeDayValue = short;
         }
     
         this.days.push({
           name: dayName,
           date: dayNumber,
           fullDate: date,
           short,
           active: isActive
         });
       }
     }
     
     setActiveDay(selectedDay: any) {
       this.days.forEach(day => {
         day.active = day.fullDate.toISOString() === selectedDay.fullDate.toISOString();
       });
     
       this.activeDayValue = selectedDay.fullDate.toISOString();
     
       setTimeout(() => {
         const index = this.days.findIndex(d => d.fullDate.toISOString() === selectedDay.fullDate.toISOString());
         const buttons = this.daySegment?.el.querySelectorAll('ion-segment-button');
         const button = buttons?.[index] as HTMLElement;
     
         if (button) {
           button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
         }
       }, 100);
     }
     onEdit(task: any): void {
      console.log('Editar tarea:', task);
    }
    
    onDelete(task: any): void {
      console.log('Eliminar tarea:', task);
    }
    
    onRemind(task: any): void {
      console.log('Recordatorio para:', task);

    }
    
}
