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
    TweenMax.to(this.topBottomSand.nativeElement, 5, {
      attr: {
        // d: 'M291,293a1.6,1.6,0,0,0,.43-.07c1.21-.4,5.42-2,7.15-3.41l0-.06a1.35,1.35,0,0,0,.21-1.46H283.22a1.23,1.23,0,0,0,0,1.35l.13.13c1.73,1.46,6.09,3,7.31,3.45A1.62,1.62,0,0,0,291,293Z',
        transform: 'scale(0.1)',
      },
      // ease: Cubic.easeInOut
    });

    TweenMax.to(this.topTopSand.nativeElement, 5, {
      attr: {
        cx: '100.5',
        cy: '216',
        rx: '8',
        ry: '1.74'
      }
    });
  }
}
