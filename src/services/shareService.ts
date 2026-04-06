import { Share } from 'react-native';

export async function shareContent(message: string): Promise<void> {
  await Share.share({ message });
}
