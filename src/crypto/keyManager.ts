import * as SecureStore from 'expo-secure-store';
import nacl from 'tweetnacl';
import { fromBase64, toBase64 } from './cryptoUtils';

const USER_SECRET_KEY = 'socialfarm:user:secretKey';
const USER_PUBLIC_KEY = 'socialfarm:user:publicKey';

export type KeyPairBase64 = {
  publicKey: string;
  secretKey: string;
};

export function generateKeyPair(): KeyPairBase64 {
  const pair = nacl.box.keyPair();
  return {
    publicKey: toBase64(pair.publicKey),
    secretKey: toBase64(pair.secretKey)
  };
}

export async function savePrivateKey(secretKey: string): Promise<void> {
  await SecureStore.setItemAsync(USER_SECRET_KEY, secretKey);
}

export async function loadPrivateKey(): Promise<string | null> {
  return SecureStore.getItemAsync(USER_SECRET_KEY);
}

async function savePublicKey(publicKey: string): Promise<void> {
  await SecureStore.setItemAsync(USER_PUBLIC_KEY, publicKey);
}

async function loadPublicKey(): Promise<string | null> {
  return SecureStore.getItemAsync(USER_PUBLIC_KEY);
}

export async function ensureUserKeyPair(): Promise<KeyPairBase64> {
  const [existingSecretKey, existingPublicKey] = await Promise.all([loadPrivateKey(), loadPublicKey()]);

  if (existingSecretKey && existingPublicKey) {
    return { publicKey: existingPublicKey, secretKey: existingSecretKey };
  }

  const keys = generateKeyPair();
  await Promise.all([savePrivateKey(keys.secretKey), savePublicKey(keys.publicKey)]);
  return keys;
}

export function derivePublicKeyFromSecret(secretKey: string): string {
  return toBase64(nacl.box.keyPair.fromSecretKey(fromBase64(secretKey)).publicKey);
}

// SECURITY WARNING:
// This is a simplified E2EE implementation for MVP demonstration only.
// Production systems require forward secrecy, key rotation,
// multi-device sync, and robust identity/key verification.
