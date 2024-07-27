import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { AddTaskRequest } from '../../models/task/add-task-request';
import { DeleteTaskRequest } from '../../models/task/delete-task-request';
import { GetTasksResponse } from '../../models/task/get-task-response';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _baseUrl = `${environment.backendBaseUrl}/tasks`;
  constructor(private httpClient: HttpClient) {
  }

  addTask(request: AddTaskRequest) : Observable<void>{
    
    return this.httpClient.post<void>(`${this._baseUrl}`, request);
  }

  getTask(projectId : string) : Observable<Array<GetTasksResponse>>{
    return this.httpClient.get<Array<GetTasksResponse>>(`${this._baseUrl}/project/${projectId}`);
  }

  getTaskById(id: string): Observable<GetTasksResponse> {
    return this.httpClient.get<GetTasksResponse>(`${this._baseUrl}/${id}`);
  }

  updateTask(request: DeleteTaskRequest ): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}`, request);
  }
  deleteTask(request: DeleteTaskRequest): Observable<void>{
    return this.httpClient.post<void>(`${this._baseUrl}/delete-bulk`, request);
  }
}
