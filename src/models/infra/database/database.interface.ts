/**
 * @description This code defines an interface IDatabase with a single method execute, which takes a SQL query string and an optional array of parameters as arguments, and returns a Promise that resolves with the result of the query execution.
 *
 */
export interface IDatabase {
  execute(query: string, params?: any[]): Promise<any>;
}
