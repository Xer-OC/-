import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { theme } from '../theme';

export function Input({ style, ...props }: TextInputProps & { style?: StyleProp<ViewStyle> }) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.textSecondary}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    borderWidth: 1,
    borderColor: theme.colors.border
  }
});
