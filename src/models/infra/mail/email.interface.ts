/**
 * @description This code defines an interface IEmail that specifies a send method to be implemented by email service classes. The send method takes an email address and an options object containing a name and an event name, and returns a promise.
 *
 */
export interface IEmail {
  send(
    email: string,
    options: { name: string; event_name: string }
  ): Promise<any>;
}
