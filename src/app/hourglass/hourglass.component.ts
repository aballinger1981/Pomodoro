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
  // @ViewChild('bottomTriangle') bottomTriangle: ElementRef;
  // @ViewChild('innerRectangle') innerRectangle: ElementRef;

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    const topBottomSandTimeline: TimelineLite = new TimelineLite();
    topBottomSandTimeline.to(this.topBottomSand.nativeElement, 5, {
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
    }).to(this.topBottomSand.nativeElement, 5, {
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
    }).to(this.topBottomSand.nativeElement, 5, {
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
    }).to(this.topBottomSand.nativeElement, 5, {
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

    const topTopSandTimeline: TimelineLite = new TimelineLite();
    topTopSandTimeline.to(this.topTopSand.nativeElement, 5, {
      scaleY: 0.75,
      scaleX: 0.9,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, 5, {
      scaleY: 0.5,
      scaleX: 0.7,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, 5, {
      scaleY: 0.25,
      scaleX: 0.4,
      svgOrigin: '100 220',
      ease: Power0.easeNone
    }).to(this.topTopSand.nativeElement, 5, {
      scale: 0,
      svgOrigin: '100 220',
      ease: Power0.easeNone
      });

    const droppingSandTimeline1: TimelineLite = new TimelineLite();
    droppingSandTimeline1.to(this.droppingSand1.nativeElement, .4, {
      attr: {
        cy: 448
      },
      repeat: -1
    });

    const droppingSandTimeline2: TimelineLite = new TimelineLite();
    droppingSandTimeline2.to(this.droppingSand2.nativeElement, .45, {
      attr: {
        cy: 448,
        cx: 101
      },
      repeat: -1
    });

    const droppingSandTimeline3: TimelineLite = new TimelineLite();
    droppingSandTimeline3.to(this.droppingSand3.nativeElement, .5, {
      attr: {
        cy: 448,
        cx: 99
      },
      onComplete: this.droppingSandCheck
    });


  }

  droppingSandCheck() {
    
  }
}
