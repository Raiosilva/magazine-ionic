import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from './../../config/api.config';

import { ProductService } from './../../services/domain/product.service';
import { ProductDTO } from './../../models/product.dto';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService
    ) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.productService.findByCategory(categoria_id).subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    },
    error => {}
    );
  };

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      this.productService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {}
      );
    }
  }
}
