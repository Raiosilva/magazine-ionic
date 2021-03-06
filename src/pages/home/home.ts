import { AuthService } from './../../services/auth.service';
import { CredentialsDTO } from './../../models/credentials.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email: '',
    senha: ''
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    },
    error => {}
    );
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    },
    error => {}
    );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
