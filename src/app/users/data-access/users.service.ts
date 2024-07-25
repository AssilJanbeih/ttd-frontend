import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { AddUserRequest } from '../models/add-user/add-user-request';
import { AddUserResponse } from '../models/add-user/add-user-response';
import { GetUserResponse } from '../models/get-user/get-user-response';
import { GetUsersResponse } from '../models/get-users/get-users-response';
import { UpdateUserRequest } from '../models/update-user/update-user-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _baseUrl = `${environment.backendBaseUrl}/users`;
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Array<GetUsersResponse>>{
    return this.httpClient.get<Array<GetUsersResponse>>(`${this._baseUrl}`)
  }
  getUser(id: string): Observable<GetUserResponse>{
    return this.httpClient.get<GetUserResponse>(`${this._baseUrl}/${id}`);
  }

  addUser(request: AddUserRequest): Observable<AddUserResponse>{
    return this.httpClient.post<AddUserResponse>(`${this._baseUrl}`, request);
  }

  updateUser(request: UpdateUserRequest): Observable<void>{
    return this.httpClient.put<void>(`${this._baseUrl}`, request);
  }

}
