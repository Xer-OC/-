import { Modal as RNModal, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { theme } from '../theme';
import { Card } from './Card';

export function Modal({ visible, onClose, children }: PropsWithChildren<{ visible: boolean; onClose: () => void }>) {
  return (
    <RNModal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Card style={styles.content}>{children}</Card>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2,6,23,0.7)',
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  content: {
    padding: theme.spacing.lg
  }
});
