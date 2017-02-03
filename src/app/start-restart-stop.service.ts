import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StartRestartStopService {
  pauseResumeButtonText: string = 'Pause';
  pauseStartTime: number = 0;
  pauseAnimation: Subject<any> = new Subject<any>();
  resumeAnimation: Subject<any> = new Subject<any>();
  stopAnimation: Subject<any> = new Subject<any>();

  constructor(private timerService: TimerService) { }

startOrRestartTimer() {
    if (this.timerService.pomodoroLength === null
      || this.timerService.breakLength === null
      || this.timerService.pomodoroLength <= 0
      || this.timerService.breakLength <= 0) { return; }

    const timerMode: string = this.timerService.currentMode;
    if (timerMode === 'pomodoroFinished') {
      this.timerService.updateCurrentMode();
      this.timerService.startButtonState = 'Restart Break';
    } else if (timerMode === 'breakFinished') {
      this.timerService.updateCurrentMode();
      this.timerService.startButtonState = 'Restart Pomodoro';
    } else if (timerMode === 'pomodoroTimer') {
      this.timerService.startButtonState = 'Restart Pomodoro';
    } else if (timerMode === 'breakTimer') {
      this.timerService.startButtonState = 'Restart Break';
    }
    this.timerService.startTimerTracking();
    this.pauseResumeButtonText = 'Pause';
    this.timerService.timerIsRunning = true;
  }

  pauseOrResumeTimer() {
    if (this.timerService.pomodoroLength === null || this.timerService.breakLength === null
    || this.timerService.pomodoroLength === 0 || this.timerService.breakLength === 0) { return; }

    if (this.timerService.timeRemaining === undefined) { return; }

    if (this.timerService.timerIsRunning === true) {
      clearInterval(this.timerService.intervalId);
      this.pauseResumeButtonText = 'Resume';
      this.pauseAnimation.next();
      this.timerService.timerIsRunning = false;
      this.pauseStartTime = new Date().getTime();
    } else if (this.timerService.timerIsRunning === false) {
      this.timerService.pausedTime += new Date().getTime() - this.pauseStartTime;
      if (this.timerService.currentMode === 'pomodoroTimer') {
        this.timerService.intervalId = setInterval(() => {
          this.timerService.getTimeRemaining(this.timerService.savedLengths[0]);
        }, 100);
        this.pauseResumeButtonText = 'Pause';
        this.timerService.timerIsRunning = true;
      } else {
        this.timerService.intervalId = setInterval(() => {
          this.timerService.getTimeRemaining(this.timerService.savedLengths[1]);
        }, 100);
        this.pauseResumeButtonText = 'Pause';
        this.timerService.timerIsRunning = true;
      }
      this.resumeAnimation.next();
    }
  }

  stopTimer() {
    clearInterval(this.timerService.intervalId);
    this.timerService.timeRemaining = undefined;
    this.timerService.timerIsRunning = false;
    this.pauseResumeButtonText = 'Pause';
    this.timerService.savedLengths = [];
    if (this.timerService.currentMode === 'pomodoroTimer') {
      this.timerService.startButtonState = 'Start Pomodoro';
    } else if (this.timerService.currentMode === 'breakTimer') {
      this.timerService.startButtonState = 'Start Break';
    }
    this.stopAnimation.next();
  }

}
