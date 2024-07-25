export interface UpdatTaskRequest{
  entityId: string;
  name: string;
  projectId: string;
  assignee: string;
  priority: string;
  status: string;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate: Date;
  createdOn: Date;
}
