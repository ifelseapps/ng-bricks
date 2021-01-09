import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BricksModule } from 'bricks';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ComponentDetailsComponent } from './components/component-details/component-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ComboboxExampleComponent } from './examples/combobox-example/combobox-example.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ComponentDetailsComponent,
    ComboboxExampleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BricksModule,
    CdkScrollableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
