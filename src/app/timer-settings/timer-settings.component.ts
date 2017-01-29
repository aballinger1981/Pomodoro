import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-timer-settings',
  templateUrl: './timer-settings.component.html',
  styleUrls: ['./timer-settings.component.css']
})
export class TimerSettingsComponent implements OnInit {

  constructor(public timeService: TimeService) { }

  ngOnInit() {
  }

}
