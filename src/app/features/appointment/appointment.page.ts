import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { shareDataService } from 'src/app/core/services/DataShareService/shareDataService';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone: false,
})
export class AppointmentPage  {
  selectedTab = 'cita';
  company = {
    name: 'Von Inc',
    description: 'Servicios de belleza personalizados para toda la familia.',
    phone: '+57 300 1234567',
    url: 'https://voninc.com',
    type: 'Independiente',
    location: 'Cra. 45 #123-45, Medellín, Antioquia',
    city: 'Medellín'
  };

  @ViewChild('daySegment', { static: false }) daySegment: any;
  private daysInitialized = false;


  activeDayValue: string = '';
  days: { name: string, date: number, fullDate: Date, short: string, active: boolean }[] = [];
  tasks: any = [
    {
      time: '09:00 - 09:30',
      duration: '30 Minutes',
      title: 'Coffee with Julia',
      subtitle: 'at Coffee Adda',
      status: 'Done',
      statusClass: 'done'
    },
    {
      time: '10:00 - 11:30',
      duration: '1.5 Hours',
      title: 'E-commerce app project meeting',
      subtitle: '',
      status: 'In Progress',
      statusClass: 'in-progress'
    },

  ];

    constructor(private router: Router,   private sharedData: shareDataService) {
      console.log('sharedData-->', this.sharedData.data)
    }

    ngOnInit() {
      if (!this.daysInitialized) {
        this.generateNext30Days();
        this.daysInitialized = true;
      }
    }

    
    stories = [
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'London', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Turkey', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'NYC', img: 'https://picsum.photos/600/300?random=5' },
      { title: 'Vietnam', img: 'https://picsum.photos/600/300?random=5' },
    ];


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
    
}
