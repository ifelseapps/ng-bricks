import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BricksModule } from 'bricks';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BricksModule,
    CdkScrollableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
