import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(private timeService: TimeService) { }

  ngOnInit() {
  }

}
