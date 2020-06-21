import { CartService } from './../../services/domain/cart.service';
import { ProductService } from './../../services/domain/product.service';
import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService
    ) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.productService.findById(produto_id).subscribe(response => {
      this.item = response;
      this.getImageUrlExists();
    },
    error => {

    });
  }

  getImageUrlExists() {
    this.productService.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    },
    error => {

    });
  }

  addToCart(produto: ProductDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
}
