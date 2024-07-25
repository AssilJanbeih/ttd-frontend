export interface GetTasksResponse{
  entityId: string;
  name: string;
  projectId: string;
  priority: string;
  assignee: string;
  status: string;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate: Date;
  createdOn: Date;
}
