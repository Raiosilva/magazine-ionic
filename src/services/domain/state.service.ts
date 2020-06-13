import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { API_CONFIG } from '../../config/api.config';
import { StateDTO } from '../../models/state.dto';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class StateService {

  constructor(public http: HttpClient) {}

  findAll(): Observable<StateDTO[]> {
    return this.http.get<StateDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }
}
