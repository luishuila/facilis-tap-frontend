import { Component, OnInit, ViewChild } from '@angular/core';

type DayItem = {
  name: string;          // FRI, SAT...
  date: number;          // 8, 9...
  fullDate: Date;
  active: boolean;
};

type TaskItem = {
  title: string;
  time: string;
  subtitle?: string;
  color: string;
  tag?: string;
};

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss'],
  standalone: false,
})
export class AppointmentScheduleComponent implements OnInit {
  @ViewChild('daySegment', { static: false }) daySegment: any;

  readonly TASK_ROW_SIZE = 10; // Debe coincidir con el min-height de .task-card

  activeDayValue = '';
  days: DayItem[] = [];
  tasks: TaskItem[] = [
    { title: 'Dinner and Daisy', time: '1:00 PM', subtitle: 'with Tina', color: '#fc5c65', tag: 'Tina' },
    { title: 'Attend The Meeting', time: '3:00 PM', subtitle: 'Quarter numbers review', color: '#fd9644', tag: 'Work' },
    { title: 'See A Movie', time: '6:00 PM', subtitle: 'with girlfriend', color: '#8854d0', tag: 'Leisure' },
    { title: 'Birthday Party', time: '9:00 PM', color: '#f7b731', tag: 'Joy' },
  ];

  ngOnInit(): void {
    this.generateNext30Days();
  }

  private generateNext30Days(): void {
    this.days = [];
    const today = new Date();

    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const name = date
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toUpperCase();

      const active = i === 0;

      this.days.push({
        name,
        date: date.getDate(),
        fullDate: date,
        active,
      });

      if (active) this.activeDayValue = date.toISOString();
    }
  }

  setActiveDay(selected: DayItem): void {
    this.days.forEach(d => (d.active = d.fullDate.getTime() === selected.fullDate.getTime()));
    this.activeDayValue = selected.fullDate.toISOString();

    // Centrar el botón seleccionado
    setTimeout(() => {
      const index = this.days.findIndex(d => d.active);
      const buttons = this.daySegment?.el?.querySelectorAll('ion-segment-button');
      const btn = buttons?.[index] as HTMLElement;
      btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, 80);
  }

  onBook(task: TaskItem): void {
    // Aquí lanzas tu flujo de agendamiento (modal / route)
    console.log('Agendar servicio para:', this.activeDayValue, task);
  }
}
