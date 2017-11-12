import { WorksheetService } from './services/worksheet/worksheet.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'search', component: SearchComponent},
      { path: 'upload', component: UploadComponent},
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    WorksheetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
