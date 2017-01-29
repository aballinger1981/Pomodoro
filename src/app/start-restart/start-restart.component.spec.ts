/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartRestartComponent } from './start-restart.component';

describe('StartRestartComponent', () => {
  let component: StartRestartComponent;
  let fixture: ComponentFixture<StartRestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
