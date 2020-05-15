import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-planning-absence',
  templateUrl: './planning-absence.component.html',
  styleUrls: ['./planning-absence.component.scss']
})
export class PlanningAbsenceComponent implements OnInit {
  
  calendarPlugins = [dayGridPlugin];
  locale: string = 'fr';
  
  constructor() { }

  ngOnInit(): void {
  }
  

}
