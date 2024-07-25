export interface AddProjectRequest{
  name: string;
  projectManager: string;
  clientEmail: string;
  slackLink: string;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate: Date;
  completion: number;
}
