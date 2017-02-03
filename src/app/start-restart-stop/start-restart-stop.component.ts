import { Component, OnInit } from '@angular/core';
import { StartRestartStopService } from '../start-restart-stop.service';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-start-restart-stop',
  templateUrl: './start-restart-stop.component.html',
  styleUrls: ['./start-restart-stop.component.css']
})
export class StartRestartStopComponent implements OnInit {

  constructor(private startRestartStopService: StartRestartStopService,
              private timerService: TimerService) { }

  ngOnInit() {
  }

  startOrRestartTimer() {
    this.startRestartStopService.startOrRestartTimer();
  }

  pauseOrResumeTimer() {
    this.startRestartStopService.pauseOrResumeTimer();
  }

  stopTimer() {
    this.startRestartStopService.stopTimer();
  }


}
