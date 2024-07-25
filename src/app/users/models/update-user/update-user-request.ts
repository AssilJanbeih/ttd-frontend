export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  active: boolean;
  title: string;
  jobTypeId: string;
}
