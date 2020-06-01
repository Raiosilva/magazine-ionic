import { CategorieService } from './../../services/categorie.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categorieService: CategorieService
    ) {
  }

  ionViewDidLoad() {
    this.categorieService.findAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
