import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MessageRow } from '../../components/message-row';
import { inboxThreads } from '../../data/mock';
import { theme } from '../../ui/theme';

export function MessagesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Swipe left to mute • swipe right to pin • long press for actions</Text>
      <FlatList
        data={inboxThreads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: theme.spacing.sm + 2, paddingBottom: theme.spacing.md }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Conversation' as never)}>
            <MessageRow item={item} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  hint: { color: theme.colors.textSecondary, marginBottom: theme.spacing.sm + 4 }
});
