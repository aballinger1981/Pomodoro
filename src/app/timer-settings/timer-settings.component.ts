import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer-settings',
  templateUrl: './timer-settings.component.html',
  styleUrls: ['./timer-settings.component.css']
})
export class TimerSettingsComponent implements OnInit {

  constructor(public timerService: TimerService) { }

  ngOnInit() {
  }

}
