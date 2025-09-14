import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config.interface';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiUrl = 'http://localhost:8080/api/configs';

  constructor(private http: HttpClient) {}

  getConfigs(): Observable<Config[]> {
    return this.http.get<Config[]>(this.apiUrl);
  }

  submitConfig(configId: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${configId}/submit`, formData);
  }
}
