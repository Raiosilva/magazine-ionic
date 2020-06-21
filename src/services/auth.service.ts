import { CartService } from './domain/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { JwtHelper } from 'angular2-jwt';

import { CredentialsDTO } from './../models/credentials.dto';
import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storageService: StorageService,
    public cartService: CartService
    ) {}

  authenticate(creds: CredentialsDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  successfulLogin(authorizationValue:string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storageService.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storageService.setLocalUser(null);
  }

}
