/**
 * @description This code defines an appointmentModel interface which has several properties such as id, title, description, date, duration, location, invite, and createdAt. The id property is optional and the others are required. This interface is likely used to define the structure of objects representing appointments in a scheduling application.
 *
 */
export interface appointmentModel {
  id?: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  location: string;
  invite?: boolean;
  createdAt?: string;
}
