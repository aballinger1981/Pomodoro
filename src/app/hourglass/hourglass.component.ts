import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.css']
})
export class HourglassComponent implements OnInit {
  @ViewChild('bottomSand') bottomSand: ElementRef;
  @ViewChild('topTriangle') topTriangle: ElementRef;
  @ViewChild('bottomTriangle') bottomTriangle: ElementRef;
  @ViewChild('innerRectangle') innerRectangle: ElementRef;

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    TweenMax.to(this.bottomSand.nativeElement, 60, {
      attr: {
        points: '4,260.3 50,180 77,150.9 104,180 150,260.3'
      },
      repeat: -1,
      yoyo: true,
      // ease: Cubic.easeInOut
    });
  }
}
