import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { API_CONFIG } from '../../config/api.config';
import { CityDTO } from '../../models/city.dto';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CityService {

  constructor(public http: HttpClient) {}

  findAll(estado_id: string): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
  }
}
