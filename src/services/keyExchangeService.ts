const publicKeyMap = new Map<string, string>();

export function registerUserPublicKey(userId: string, publicKey: string): void {
  publicKeyMap.set(userId, publicKey);
}

export function getPublicKeyForUser(userId: string): string | undefined {
  return publicKeyMap.get(userId);
}

export function exchangePublicKeys(participants: Array<{ userId: string; publicKey: string }>): Map<string, string> {
  participants.forEach((participant) => {
    publicKeyMap.set(participant.userId, participant.publicKey);
  });

  return new Map(publicKeyMap);
}
