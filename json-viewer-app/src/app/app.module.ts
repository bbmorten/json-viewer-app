import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';

import { FormsModule } from '@angular/forms'; // Add this import
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [AppComponent, JsonViewerComponent],
  imports: [
    BrowserModule,
    FormsModule, // Add this line
    HttpClientModule, // Add this line,
    ClipboardModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
