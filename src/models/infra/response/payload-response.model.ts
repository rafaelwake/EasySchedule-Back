/**
 * @description This code defines an interface IPayloadResponseModel that has three properties: success which is a boolean, message which is an optional string or null, and data which is of type any. This interface is used to define the shape of the response payload in the application.
 *
 */
export interface IPayloadResponseModel {
  success: boolean;
  message?: string | null;
  data: any;
}
