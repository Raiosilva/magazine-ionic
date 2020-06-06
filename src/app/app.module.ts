import { AuthInterceptorProvider } from './../interceptor/auth-interceptor';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './../services/auth.service';
import { CategorieService } from '../services/domain/categorie.service';
import { ClientService } from './../services/domain/client.service';
import { ErrorInterceptorProvider } from './../interceptor/error-interceptor';
import { MyApp } from './app.component';
import { StorageService } from '../services/storage.service';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategorieService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClientService,
  ]
})
export class AppModule {}
