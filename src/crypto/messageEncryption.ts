import nacl from 'tweetnacl';
import { fromBase64, randomNonce, toBase64, utf8ToBytes, bytesToUtf8 } from './cryptoUtils';

export type EncryptedMessagePayload = {
  id: string;
  senderId: string;
  ciphertext: string;
  nonce: string;
  timestamp: number;
};

export function encryptMessage(
  message: string,
  recipientPublicKey: string,
  senderSecretKey: string,
  metadata: { id: string; senderId: string; timestamp?: number }
): EncryptedMessagePayload {
  const nonce = randomNonce();
  const encrypted = nacl.box(utf8ToBytes(message), nonce, fromBase64(recipientPublicKey), fromBase64(senderSecretKey));

  return {
    id: metadata.id,
    senderId: metadata.senderId,
    ciphertext: toBase64(encrypted),
    nonce: toBase64(nonce),
    timestamp: metadata.timestamp ?? Date.now()
  };
}

export function decryptMessage(
  encryptedMessage: EncryptedMessagePayload,
  senderPublicKey: string,
  receiverSecretKey: string
): string | null {
  const opened = nacl.box.open(
    fromBase64(encryptedMessage.ciphertext),
    fromBase64(encryptedMessage.nonce),
    fromBase64(senderPublicKey),
    fromBase64(receiverSecretKey)
  );

  if (!opened) {
    return null;
  }

  return bytesToUtf8(opened);
}
