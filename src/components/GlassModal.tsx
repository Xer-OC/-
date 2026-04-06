import { BlurView } from 'expo-blur';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { GlassCard } from './GlassCard';

type GlassModalProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>;

export function GlassModal({ visible, onClose, children }: GlassModalProps) {
  return (
    <Modal animationType="fade" visible={visible} transparent onRequestClose={onClose}>
      <BlurView intensity={20} tint="dark" style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.center}>
          <GlassCard style={styles.modalCard}>{children}</GlassCard>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2,6,23,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  center: {
    width: '100%',
    maxWidth: 420
  },
  modalCard: {
    width: '100%'
  }
});
