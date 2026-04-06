import nacl from 'tweetnacl';
import { decodeBase64, encodeBase64, decodeUTF8, encodeUTF8 } from 'tweetnacl-util';

export type Base64Bytes = string;

export function randomNonce(): Uint8Array {
  return nacl.randomBytes(nacl.box.nonceLength);
}

export function toBase64(bytes: Uint8Array): Base64Bytes {
  return encodeBase64(bytes);
}

export function fromBase64(value: Base64Bytes): Uint8Array {
  return decodeBase64(value);
}

export function utf8ToBytes(value: string): Uint8Array {
  return decodeUTF8(value);
}

export function bytesToUtf8(bytes: Uint8Array): string {
  return encodeUTF8(bytes);
}
