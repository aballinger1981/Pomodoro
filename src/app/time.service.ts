import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  numberOfPomodoros: number = 0;
  breakLength: number = 5;
  pomodoroLength: number = 25;
  autoStartNewTimers: boolean = true;
  currentMode: string = 'pomodoroTimer';
  startTime: number;
  timeRemaining: string;
  startButtonState: string = 'Start Pomodoro';
  intervalId: any;
  timerIsRunning: boolean = false;
  pausedTime: number = 0;

  constructor() { }
  // test
  getTimeRemaining() {
    let milliseconds: number;
    if (this.currentMode === 'pomodoroTimer' && this.pomodoroLength !== null
      && this.pomodoroLength > 0) {
      milliseconds = (this.pomodoroLength * 60000) -
        (Date.now() - this.startTime - this.pausedTime);
      this.convertTime(milliseconds);
    } else if (this.currentMode === 'breakTimer' && this.breakLength !== null
      && this.breakLength > 0) {
      milliseconds = (this.breakLength * 60000) -
        (Date.now() - this.startTime - this.pausedTime);
      this.convertTime(milliseconds);
    }
  }

  convertTime(milliseconds) {
    const totalSeconds: number = Math.floor(milliseconds / 1000);
    const minutes: number = this.addZeroToTimeRemainingIfNeeded(Math.floor(totalSeconds / 60));
    const seconds: number = this.addZeroToTimeRemainingIfNeeded(totalSeconds - minutes * 60);
    this.timeRemaining = minutes + ':' + seconds;
    this.checkIfTimerIsFinishedAndAutoStartIsChecked(totalSeconds);
  }

  addZeroToTimeRemainingIfNeeded(minutesOrSeconds) {
    if (minutesOrSeconds.toString().length >= 2) { return minutesOrSeconds; }

    return (Math.pow(10, 2) + Math.floor(minutesOrSeconds)).toString().substring(1);
  }

  startTimerTracking() {
    if (this.pomodoroLength === null || this.breakLength === null) { return; }
    if (this.pomodoroLength <= 0 || this.breakLength <= 0) { return; }

    this.pausedTime = 0;
    if (this.currentMode === 'pomodoroFinished') {
      this.updateCurrentMode();
      this.startButtonState = 'Restart Break';
      this.startTime = new Date().getTime();
      this.intervalId = setInterval(() => { this.getTimeRemaining(); }, 100);
    } else if (this.currentMode === 'breakFinished') {
      this.updateCurrentMode();
      this.startButtonState = 'Restart Pomodoro';
      this.startTime = new Date().getTime();
      this.intervalId = setInterval(() => { this.getTimeRemaining(); }, 100);
    } else {
      this.startTime = new Date().getTime();
      this.intervalId = setInterval(() => { this.getTimeRemaining(); }, 100);
    }
  }

  checkIfTimerIsFinishedAndAutoStartIsChecked(timeLeft) {
    if (timeLeft <= 0) {
      if (this.currentMode === 'pomodoroTimer') {
        this.updateCurrentMode();
        this.startButtonState = 'Start Break';
        this.numberOfPomodoros++;
      } else if (this.currentMode === 'breakTimer') {
        this.updateCurrentMode();
        this.startButtonState = 'Start Pomodoro';
      }
      clearInterval(this.intervalId);
      this.timerIsRunning = false;
      if (this.autoStartNewTimers === true) {
        this.timerIsRunning = true;
        this.startTimerTracking();
      }
    }
  }

  updateCurrentMode() {
    switch (this.currentMode) {
      case 'pomodoroTimer':
        this.currentMode = 'pomodoroFinished';
        break;
      case 'pomodoroFinished':
        this.currentMode = 'breakTimer';
        break;
      case 'breakTimer':
        this.currentMode = 'breakFinished';
        break;
      case 'breakFinished':
        this.currentMode = 'pomodoroTimer';
        break;
      default:
        break;
    }
  }

  clearCount() {
    this.numberOfPomodoros = 0;
  }

}
