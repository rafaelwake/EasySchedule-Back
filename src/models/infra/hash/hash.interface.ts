/**
 * @description This code defines an interface IHash that has two methods: encode and check. The encode method takes an unknown value and returns a Promise that resolves to any type. The check method is an optional method that takes an unknown value and returns a Promise that resolves to any type.
 *
 */
export interface IHash {
  encode(value: unknown): Promise<any>;
  check?(value: unknown): Promise<any>;
}
