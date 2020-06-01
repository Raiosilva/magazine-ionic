import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredentialsDTO } from './../models/credentials.dto';
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {

  constructor(
    public http: HttpClient,
    public storageService: StorageService
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

  successfulLogin(authorizationValue:string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok
    };
    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }

}
