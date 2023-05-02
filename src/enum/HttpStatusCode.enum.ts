/**
 * @description 
This code declares an enumeration named HttpStatusCode, which assigns a set of HTTP status codes to named constants. Each constant represents a specific HTTP status code, such as 200 for OK, 201 for Created, 404 for Not Found, and so on.
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  NOT_AUTORIZED = 401,
  CONFLICT = 409,
  BAD_REQUEST = 400,
}
