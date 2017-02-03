import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimerService } from './timer.service';
import { StartRestartStopService } from './start-restart-stop.service';
import { HourglassComponent } from './hourglass/hourglass.component';
import { ClockComponent } from './clock/clock.component';
import { StartRestartStopComponent } from './start-restart-stop/start-restart-stop.component';
import { TimerSettingsComponent } from './timer-settings/timer-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HourglassComponent,
    ClockComponent,
    StartRestartStopComponent,
    TimerSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TimerService, StartRestartStopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
