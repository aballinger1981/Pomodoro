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
  @ViewChild('bottomBottomSand') bottomBottomSand: ElementRef;
  @ViewChild('bottomTopSand') bottomTopSand: ElementRef;
  @ViewChild('droppingSand1') droppingSand1: ElementRef;
  @ViewChild('droppingSand2') droppingSand2: ElementRef;
  @ViewChild('droppingSand3') droppingSand3: ElementRef;

  topBottomSandTimeline: TimelineLite = new TimelineLite();
  topTopSandTimeline: TimelineLite = new TimelineLite();
  bottomTopSandTimeline: TimelineLite = new TimelineLite();
  bottomBottomSandTimeline: TimelineLite = new TimelineLite();
  droppingSandTimeline1: TimelineLite = new TimelineLite();
  droppingSandTimeline2: TimelineLite = new TimelineLite();
  droppingSandTimeline3: TimelineLite = new TimelineLite();

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
    this.topTopSandTimeline.paused(false);
    this.topBottomSandTimeline.paused(false);
    this.bottomTopSandTimeline.paused(false);
    this.bottomBottomSandTimeline.paused(false);
    this.droppingSandTimeline1.paused(false);
    this.droppingSandTimeline2.paused(false);
    this.droppingSandTimeline3.paused(false);
    this.topBottomSandTimeline.progress(0);
    this.topTopSandTimeline.progress(0);
    this.bottomTopSandTimeline.progress(0);
    this.bottomBottomSandTimeline.progress(0);
    this.droppingSandTimeline1.progress(0);
    this.droppingSandTimeline2.progress(0);
    this.droppingSandTimeline3.progress(0);
    TweenMax.killAll();
    this.topSandAnimation(duration);
    this.bottomSandAnimation(duration);
    this.droppingSandAnimation();
  }

  stopAnimation() {
    this.topBottomSandTimeline.progress(0);
    this.topTopSandTimeline.progress(0);
    this.bottomTopSandTimeline.progress(0);
    this.bottomBottomSandTimeline.progress(0);
    this.droppingSandTimeline1.progress(0);
    this.droppingSandTimeline2.progress(0);
    this.droppingSandTimeline3.progress(0);
    TweenMax.killAll();
  }

  pauseAnimation() {
    this.topTopSandTimeline.paused(!this.topTopSandTimeline.paused());
    this.topBottomSandTimeline.paused(!this.topBottomSandTimeline.paused());
    this.bottomTopSandTimeline.paused(!this.bottomTopSandTimeline.paused());
    this.bottomBottomSandTimeline.paused(!this.bottomBottomSandTimeline.paused());
    this.droppingSandTimeline1.progress(0);
    this.droppingSandTimeline2.progress(0);
    this.droppingSandTimeline3.progress(0);
    this.droppingSandTimeline1.paused(!this.droppingSandTimeline1.paused());
    this.droppingSandTimeline2.paused(!this.droppingSandTimeline2.paused());
    this.droppingSandTimeline3.paused(!this.droppingSandTimeline3.paused());
  }

  resumeAnimation() {
    this.topTopSandTimeline.paused(!this.topTopSandTimeline.paused());
    this.topBottomSandTimeline.paused(!this.topBottomSandTimeline.paused());
    this.bottomTopSandTimeline.paused(!this.bottomTopSandTimeline.paused());
    this.bottomBottomSandTimeline.paused(!this.bottomBottomSandTimeline.paused());
    this.droppingSandTimeline1.paused(!this.droppingSandTimeline1.paused());
    this.droppingSandTimeline2.paused(!this.droppingSandTimeline2.paused());
    this.droppingSandTimeline3.paused(!this.droppingSandTimeline3.paused());
  }

  topSandAnimation(duration) {
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

  bottomSandAnimation(duration) {
    this.bottomBottomSandTimeline.from(this.bottomBottomSand.nativeElement, 0, {
      attr: {
        d:
          `M 100,441
          Q 180,450 195,340
          H 6
          Q 15,460 135,440
          Z`
      },
      scaleY: 0,
      scaleX: 0,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.bottomBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,441
          Q 210,450 225,340
          H 3
          Q 5,460 165,440
          Z`
      },
      scaleY: 0.25,
      scaleX: 0.4,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.bottomBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,441
          Q 190,450 220,340
          H 4
          Q 10,460 155,440
          Z`
      },
      scaleY: 0.5,
      scaleX: 0.7,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.bottomBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,441
          Q 190,450 210,340
          H 12
          Q 25,455 155,440
          Z`
      },
      scaleY: 0.75,
      scaleX: 0.9,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone
    }).to(this.bottomBottomSand.nativeElement, duration, {
      attr: {
        d: `
          M 100,441
          Q 185,450 202,340
          H 14
          Q 30,455 135,440
          Z`
      },
      scale: 1,
      transformOrigin: '50% 100%',
      ease: Power0.easeNone,
    });

    this.bottomTopSandTimeline.from(this.bottomTopSand.nativeElement, 0, {
      scaleY: 0,
      scaleX: 0,
      ease: Power0.easeNone
    }).to(this.bottomTopSand.nativeElement, duration, {
      scaleY: 0.25,
      scaleX: 0.4,
      svgOrigin: '100 441',
      ease: Power0.easeNone
    }).to(this.bottomTopSand.nativeElement, duration, {
      scaleY: 0.5,
      scaleX: 0.7,
      svgOrigin: '100 441',
      ease: Power0.easeNone
    }).to(this.bottomTopSand.nativeElement, duration, {
      scaleY: 0.75,
      scaleX: 0.9,
      svgOrigin: '100 441',
      ease: Power0.easeNone
    }).to(this.bottomTopSand.nativeElement, duration, {
      scale: 1,
      svgOrigin: '100 441',
      ease: Power0.easeNone
    });
  }

  droppingSandAnimation() {
    this.droppingSandTimeline1.to(this.droppingSand1.nativeElement, .4, {
      attr: {
        cy: 440
      },
      repeat: -1
    });

    this.droppingSandTimeline2.to(this.droppingSand2.nativeElement, .45, {
      attr: {
        cy: 440,
        cx: 101
      },
      repeat: -1
    });

    this.droppingSandTimeline3.to(this.droppingSand3.nativeElement, .5, {
      attr: {
        cy: 440,
        cx: 99
      },
      repeat: -1
    });
  }
}
