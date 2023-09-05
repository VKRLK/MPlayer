import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from '../components/table-component/table-component.component';
import {MatTableModule} from '@angular/material/table'
import {FormsModule} from '@angular/forms'
/* import { NgxAudioPlayerModule } from 'ngx-audio-player'; */
import { IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    IonicModule.forRoot(),
    FormsModule
    /* NgxAudioPlayerModule, */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
