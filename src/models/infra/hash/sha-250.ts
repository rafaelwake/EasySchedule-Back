import { IHash } from "./hash.interface";
import { createHash } from "crypto";
/**
 * @description This code exports a class Sha256 that implements an interface IHash. The Sha256 class has an async encode method that takes a string value and returns a promise that resolves to the sha256 hash of the input string in hexadecimal format. It uses the createHash function from the built-in crypto module to create the hash object, updates it with the input value, and finally returns the digest in hexadecimal format.
 *
 */
export class Sha256 implements IHash {
  async encode(value: string): Promise<any> {
    const hash = createHash("sha256");

    hash.update(value);

    return hash.digest("hex");
  }
}
