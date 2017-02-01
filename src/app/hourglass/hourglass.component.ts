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
  // @ViewChild('bottomTriangle') bottomTriangle: ElementRef;
  // @ViewChild('innerRectangle') innerRectangle: ElementRef;

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    TweenMax.to(this.topBottomSand.nativeElement, 50, {
      attr: {
        d: `M 100.4,220.36
            a 1.6,1.6 0 0,0 0.43,-0.07
            c 1.21,-0.4 5.42,-2 7.15,-3.41
            a 1.35,1.35 0 0,0 0.21,-1.46
            H 92.72
            c 1.73,1.46 6.09,3 7.31,3.45
            Z
        `,
        // transform: 'translate(140 105) scale(0.1) translate(-140 -105)',
      },
      repeat: -1
      // ease: Cubic.easeInOut
    });

    TweenMax.to(this.topTopSand.nativeElement, 50, {
      attr: {
        cx: '100.4',
        cy: '216',
        rx: '8',
        ry: '1.74'
      },
      repeat: -1
    });
  }
}

// <path class="top-bottom-sand" d="
// M 100.5,220.36
// a 1.6,1.6 0 0,0 0.43,-0.07
// c 1.21,-0.4 5.42,-2 7.15,-3.41
// l 0,-0.06
// a 1.35,1.35 0 0,0 0.21,-1.46
// H 92.72
// a 1.23,1.23 0 0,0 0,1.35
// l 0.13,0.13
// c 1.73,1.46 6.09,3 7.31,3.45
// Z" />

// <ellipse class="top-top-sand" cx="100.5" cy="215" rx="8" ry="1.74"/>