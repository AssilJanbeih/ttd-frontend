import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { JobType } from '../models/job-types';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _baseUrl = `${environment.backendBaseUrl}`;

  constructor(private httpClient: HttpClient) { }

  getJobTypes(): Observable<JobType[]> {
    return this.httpClient.get<JobType[]>(`${this._baseUrl}/${'jobtypes'}`);
  }
}
