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
  savedLengths: number[] = [];

  constructor() { }

  getTimeRemaining(timerLength) {
    let milliseconds: number;
    if (this.currentMode === 'pomodoroTimer') {
      milliseconds = (timerLength * 60000) - (Date.now() - this.startTime - this.pausedTime);
      this.convertTime(milliseconds);
    } else if (this.currentMode === 'breakTimer') {
      milliseconds = (timerLength * 60000) - (Date.now() - this.startTime - this.pausedTime);
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
    clearInterval(this.intervalId);
    this.startTime = new Date().getTime();
    this.pausedTime = 0;
    this.savedLengths = [];
    this.savedLengths.push(this.pomodoroLength);
    this.savedLengths.push(this.breakLength);

    if (this.currentMode === 'pomodoroFinished' && this.breakLength > 0) {
      this.updateCurrentMode();
      this.startButtonState = 'Restart Break';
      this.intervalId = setInterval(() => { this.getTimeRemaining(this.savedLengths[1]); }, 100);
    } else if (this.currentMode === 'breakFinished' && this.pomodoroLength > 0) {
      this.updateCurrentMode();
      this.startButtonState = 'Restart Pomodoro';
      this.intervalId = setInterval(() => { this.getTimeRemaining(this.savedLengths[0]); }, 100);
    } else if (this.currentMode === 'pomodoroTimer' && this.pomodoroLength > 0) {
      this.intervalId = setInterval(() => { this.getTimeRemaining(this.savedLengths[0]); }, 100);
    } else if (this.currentMode === 'breakTimer' && this.breakLength >   0) {
      this.intervalId = setInterval(() => { this.getTimeRemaining(this.savedLengths[1]); }, 100);
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
