export interface SchedulingModel {
  id?: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  location: string;
  invite?: boolean;
  createdAt?: string;
}
