/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StartRestartStopService } from './start-restart-stop.service';

describe('StartRestartStopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartRestartStopService]
    });
  });

  it('should ...', inject([StartRestartStopService], (service: StartRestartStopService) => {
    expect(service).toBeTruthy();
  }));
});
