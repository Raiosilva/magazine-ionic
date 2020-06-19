import { ProductDTO } from './../../models/product.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Rx';

import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {}

  findById(produto_id: string) {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategory(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, {responseType: 'blob'});
  }
}
