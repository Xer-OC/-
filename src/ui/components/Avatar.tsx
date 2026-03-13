import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export function Avatar({ label, size = 36, style }: { label: string; size?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0'
  }
});
