/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartRestartStopComponent } from './start-restart-stop.component';

describe('StartRestartComponent', () => {
  let component: StartRestartStopComponent;
  let fixture: ComponentFixture<StartRestartStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRestartStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRestartStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
