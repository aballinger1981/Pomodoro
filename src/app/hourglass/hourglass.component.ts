import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { StartRestartStopService } from '../start-restart-stop.service';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.css']
})
export class HourglassComponent implements OnInit {
  @ViewChild('topBottomSand') topBottomSand: ElementRef;
  @ViewChild('topTopSand') topTopSand: ElementRef;
  @ViewChild('droppingSand1') droppingSand1: ElementRef;
  @ViewChild('droppingSand2') droppingSand2: ElementRef;
  @ViewChild('droppingSand3') droppingSand3: ElementRef;

  topBottomSandTimeline: TimelineLite = new TimelineLite();
  topTopSandTimeline: TimelineLite = new TimelineLite();
  droppingSandTimeline1: TimelineLite = new TimelineLite();
  droppingSandTimeline2: TimelineLite = new TimelineLite();
  droppingSandTimeline3: TimelineLite = new TimelineLite();
  topTopSandProgress: number;
  topBottomSandProgress: number;
  topTweenDuration: number;

  constructor(private timerService: TimerService,
    private startRestartStopService: StartRestartStopService) {
    timerService.startAnimation.subscribe(duration => this.resetAndStartAnimations(duration));
    timerService.stopAnimation.subscribe(() => this.stopAnimation());
    startRestartStopService.stopAnimation.subscribe(() => this.stopAnimation());
    startRestartStopService.resumeAnimation.subscribe(() => this.resumeAnimation());
    startRestartStopService.pauseAnimation.subscribe(() => this.pauseAnimation());
  }

  ngOnInit() {

  }

  resetAndStartAnimations(duration) {
    duration = duration * 60 / 4 - .25;
    this.topBottomSandTimeline.progress(0);
    this.topTopSandTimeline.progress(0);
    this.droppingSandTimeline1.progress(0);
    this.droppingSandTimeline2.progress(0);
    this.droppingSandTimeline3.progress(0);
    TweenMax.killAll();
    this.sandAnimation(duration);
    this.droppingSandAnimation();
  }

  stopAnimation() {
    this.topBottomSandTimeline.progress(0);
    this.topTopSandTimeline.progress(0);
    this.droppingSandTimeline1.progress(0);
    this.droppingSandTimeline2.progress(0);
    this.droppingSandTimeline3.progress(0);
    TweenMax.killAll();
  }

  pauseAnimation() {
    this.topTweenDuration = this.topTopSandTimeline.duration();
    this.topTopSandProgress = this.topTopSandTimeline.progress();
    this.topBottomSandProgress = this.topBottomSandTimeline.progress();
    this.topBottomSandTimeline.pause();
    this.topTopSandTimeline.pause();
    this.droppingSandTimeline1.progress(1);
    this.droppingSandTimeline2.progress(1);
    this.droppingSandTimeline3.progress(1);
  }

  resumeAnimation() {
    TweenMax.killAll();
    this.topTopSandTimeline.progress(this.topTopSandProgress);
    this.topBottomSandTimeline.progress(this.topBottomSandProgress);
    this.droppingSandAnimation();
    this.sandAnimation(this.topTweenDuration - (this.topTweenDuration * this.topTopSandProgress));
  }

  sandAnimation(duration) {
    this.topBottomSandTimeline.from(this.topBottomSand.nativeElement, 0, {
      attr: {
        d: `M 100,220
          Q 180,160 195,100
          H 5
          Q 22,160 100,220
          Z`
      },
      scaleY: 1,
      scaleX: 1,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.topBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,220
          Q 160,160 195,100
          H 5
          Q 42,160 100,220
        Z`
      },
      scaleY: 0.75,
      scaleX: 0.9,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.topBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,220
          Q 150,160 195,100
          H 5
          Q 52,160 100,220
        Z`
      },
      scaleY: 0.5,
      scaleX: 0.7,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.topBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,220
          Q 150,160 195,100
          H 5
          Q 52,160 100,220
        Z`
      },
      scaleY: 0.25,
      scaleX: 0.4,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.topBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,220
          Q 160,160 195,100
          H 5
          Q 22,160 100,220
        Z`
      },
      scale: 0,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone,
    });

    this.topTopSandTimeline.from(this.topTopSand.nativeElement, 0, {
      scaleY: 1,
      scaleX: 1,
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration, {
      scaleY: 0.75,
      scaleX: 0.9,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration, {
      scaleY: 0.5,
      scaleX: 0.7,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration, {
      scaleY: 0.25,
      scaleX: 0.4,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration, {
      scale: 0,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    });
  }

  droppingSandAnimation() {
    this.droppingSandTimeline1.to(this.droppingSand1.nativeElement, .4, {
      attr: {
        cy: 448
      },
      repeat: -1
    });

    this.droppingSandTimeline2.to(this.droppingSand2.nativeElement, .45, {
      attr: {
        cy: 448,
        cx: 101
      },
      repeat: -1
    });

    this.droppingSandTimeline3.to(this.droppingSand3.nativeElement, .5, {
      attr: {
        cy: 448,
        cx: 99
      },
      // onComplete: this.droppingSandCheck,
      // onCompleteScope: this
    });
  }

  // droppingSandCheck() {
  //   if (this.timerService.currentMode === undefined) { return; }

  //   if (this.timerService.startButtonState === 'Start Pomodoro'
  //     || this.timerService.startButtonState === 'Start Break') {
  //     this.droppingSandTimeline1.progress(1);
  //     this.droppingSandTimeline2.progress(1);
  //     this.droppingSandTimeline3.progress(1);
  //     this.topBottomSandTimeline.progress(0).pause();
  //     this.topTopSandTimeline.progress(0).pause();
  //   }
  //  }
}
