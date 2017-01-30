import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-start-restart',
  templateUrl: './start-restart.component.html',
  styleUrls: ['./start-restart.component.css']
})
export class StartRestartComponent implements OnInit {
  pauseResumeButtonText: string = 'Pause';
  pauseStartTime: number = 0;

  constructor(private timeService: TimeService) { }

  ngOnInit() {
  }

  startOrRestartTimer() {
    if (this.timeService.pomodoroLength === null
      || this.timeService.breakLength === null
      || this.timeService.pomodoroLength <= 0
      || this.timeService.breakLength <= 0) { return; }

    const timerMode: string = this.timeService.currentMode;
    if (timerMode === 'pomodoroFinished') {
      this.timeService.updateCurrentMode();
      this.timeService.startButtonState = 'Restart Break';
    } else if (timerMode === 'breakFinished') {
      this.timeService.updateCurrentMode();
      this.timeService.startButtonState = 'Restart Pomodoro';
    } else if (timerMode === 'pomodoroTimer') {
      this.timeService.startButtonState = 'Restart Pomodoro';
    } else if (timerMode === 'breakTimer') {
      this.timeService.startButtonState = 'Restart Break';
    }
    this.timeService.startTimerTracking();
    this.pauseResumeButtonText = 'Pause';
    this.timeService.timerIsRunning = true;
  }

  pauseOrResume() {
    if (this.timeService.pomodoroLength === null || this.timeService.breakLength === null
    || this.timeService.pomodoroLength === 0 || this.timeService.breakLength === 0) { return; }

    if (this.timeService.timeRemaining === undefined) { return; }

    if (this.timeService.timerIsRunning === true) {
      clearInterval(this.timeService.intervalId);
      this.pauseResumeButtonText = 'Resume';
      this.timeService.timerIsRunning = false;
      this.pauseStartTime = new Date().getTime();
    } else if (this.timeService.timerIsRunning === false) {
      this.timeService.pausedTime += new Date().getTime() - this.pauseStartTime;
      if (this.timeService.currentMode === 'pomodoroTimer') {
        this.timeService.intervalId = setInterval(() => {
          this.timeService.getTimeRemaining(this.timeService.savedLengths[0]);
        }, 100);
        this.pauseResumeButtonText = 'Pause';
        this.timeService.timerIsRunning = true;
      } else {
        this.timeService.intervalId = setInterval(() => {
          this.timeService.getTimeRemaining(this.timeService.savedLengths[1]);
        }, 100);
        this.pauseResumeButtonText = 'Pause';
        this.timeService.timerIsRunning = true;
      }
    }
  }

  stop() {
    clearInterval(this.timeService.intervalId);
    this.timeService.timeRemaining = undefined;
    this.timeService.timerIsRunning = false;
    this.pauseResumeButtonText = 'Pause';
    this.timeService.savedLengths = [];
    if (this.timeService.currentMode === 'pomodoroTimer') {
      this.timeService.startButtonState = 'Start Pomodoro';
    } else if (this.timeService.currentMode === 'breakTimer') {
      this.timeService.startButtonState = 'Start Break';
    }
  }

}
