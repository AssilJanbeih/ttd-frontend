import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { AddProjectRequest } from '../models/project/add-project-request';
import { GetProjectsResponse } from '../models/project/get-projects-response';
import { UpdateProjectRequest } from '../models/project/update-project-request';
import { AddProjectResponse } from '../models/project/add-project-response';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  private _baseUrl = `${environment.backendBaseUrl}/projects`;

  constructor(private httpClient: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  


  addProject(request: AddProjectRequest): Observable<AddProjectResponse> {
    return this.httpClient.post<AddProjectResponse>(`${this._baseUrl}`, request, { headers: this.getAuthHeaders() });
  }

  getProjects(): Observable<Array<GetProjectsResponse>> {
    return this.httpClient.get<Array<GetProjectsResponse>>(`${this._baseUrl}`, { headers: this.getAuthHeaders() });
  }

  updateProject(request: UpdateProjectRequest): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}`, request, { headers: this.getAuthHeaders() });
  }

  deleteProject(projectId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${projectId}`, { headers: this.getAuthHeaders() });
  }

  getProject(projectId: string): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(`${this._baseUrl}/${projectId}`, { headers: this.getAuthHeaders() });
  }
}
