import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimeService } from '../time.service';

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

  constructor(private timeService: TimeService) {
    timeService.updateAnimation.subscribe(value => this.animation(value));
  }

  ngOnInit() {

  }

  stopAnimation() {
    this.topBottomSandTimeline.progress(0);
    this.topTopSandTimeline.progress(0);
    this.droppingSandTimeline1.progress(1);
    this.droppingSandTimeline2.progress(1);
    this.droppingSandTimeline3.progress(1);
  }

  pauseAnimation() {
    this.topBottomSandTimeline.pause();
    this.topTopSandTimeline.pause();
    this.droppingSandTimeline1.progress(1);
    this.droppingSandTimeline2.progress(1);
    this.droppingSandTimeline3.progress(1);
  }

  resumeAnimation() {
    this.topBottomSandTimeline.resume();
    this.topTopSandTimeline.resume();
    this.droppingSandTimeline1.play();
    this.droppingSandTimeline2.play();
    this.droppingSandTimeline3.play();
  }

  animation(duration) {
    this.topBottomSandTimeline.to(this.topBottomSand.nativeElement, duration * 60 / 4, {
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
    }).to(this.topBottomSand.nativeElement, duration * 60 / 4, {
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
    }).to(this.topBottomSand.nativeElement, duration * 60 / 4, {
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
    }).to(this.topBottomSand.nativeElement, duration * 60 / 4, {
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
      ease: Power0.easeNone
    });

    this.topTopSandTimeline.to(this.topTopSand.nativeElement, duration * 60 / 4, {
      scaleY: 0.75,
      scaleX: 0.9,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration * 60 / 4, {
      scaleY: 0.5,
      scaleX: 0.7,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration * 60 / 4, {
      scaleY: 0.25,
      scaleX: 0.4,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, duration * 60 / 4, {
      scale: 0,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    });


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
      onComplete: this.droppingSandCheck,
      onCompleteScope: this
    });
  }

  droppingSandCheck() {
    if (this.timeService.currentMode === undefined) { return; }

    if (this.timeService.startButtonState === 'Start Pomodoro'
      || this.timeService.startButtonState === 'Start Break') {
      this.droppingSandTimeline1.progress(1);
      this.droppingSandTimeline2.progress(1);
      this.droppingSandTimeline3.progress(1);
      this.topBottomSandTimeline.progress(0).pause();
      this.topTopSandTimeline.progress(0).pause();
    }
   }
}
