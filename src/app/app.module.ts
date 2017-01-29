import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimeService } from './time.service';
import { HourglassComponent } from './hourglass/hourglass.component';
import { ClockComponent } from './clock/clock.component';
import { StartRestartComponent } from './start-restart/start-restart.component';
import { TimerSettingsComponent } from './timer-settings/timer-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HourglassComponent,
    ClockComponent,
    StartRestartComponent,
    TimerSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
