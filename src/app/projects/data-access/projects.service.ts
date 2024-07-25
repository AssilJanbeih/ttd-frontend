import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AddProjectRequest } from '../models/project/add-project-request';
import { GetProjectsResponse } from '../models/project/get-projects-response';
import { UpdateProjectRequest } from '../models/project/update-project-request';
import { AddProjectResponse } from '../models/project/add-project-response';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private _baseUrl = `${environment.backendBaseUrl}/projects`;

  constructor(private httpClient: HttpClient) {
  }

  addProject(request: AddProjectRequest): Observable<AddProjectResponse> {
    return this.httpClient.post<AddProjectResponse>(`${this._baseUrl}`, request);
  }

  getProjects(): Observable<Array<GetProjectsResponse>> {
    return this.httpClient.get<Array<GetProjectsResponse>>(`${this._baseUrl}`);
  }

  updateProject(request: UpdateProjectRequest): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}`, request);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}`, projectId);
  }

  getProject(projectId: string): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(`${this._baseUrl}/${projectId}`);
  }

  generateProjectDetails(advancedSearch?: HttpParams): Observable<Blob> {
    return this.httpClient.get(`${this._baseUrl}/generate-project-details`, {responseType: 'blob', params: advancedSearch});
  }
  generateProjectDetailsPdf(advancedSearch?: HttpParams): Observable<Blob> {
    return this.httpClient.get(`${this._baseUrl}/generate-project-details-pdf`, {responseType: 'blob', params: advancedSearch});
  }
  generateProjectDetailsExcel(advancedSearch?: HttpParams): Observable<Blob> {
    return this.httpClient.get(`${this._baseUrl}/generate-project-details-excel`, {responseType: 'blob', params: advancedSearch});
  }
}
