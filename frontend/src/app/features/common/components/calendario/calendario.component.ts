import { Component, NgModule } from '@angular/core';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-calendario',
  imports: [],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})

export class CalendarioComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
}
