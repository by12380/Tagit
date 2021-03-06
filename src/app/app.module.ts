import { ErrorHandler } from '@angular/core';
import { WorksheetService } from './services/worksheet/worksheet.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

import { GapiErrorHandler } from './common/gapi-error-handler';

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
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'search', component: SearchComponent},
      { path: 'upload', component: UploadComponent},
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    WorksheetService,
    { provide: ErrorHandler, useClass: GapiErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
