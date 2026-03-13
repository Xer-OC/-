import { FlatList, StyleSheet, Text, View } from 'react-native';

const items = ['Magic Feed x4', 'Growth Potion x2', 'Sparkle Dust x8'];

export function InventoryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(v) => v}
        renderItem={({ item }) => <View style={styles.item}><Text>{item}</Text></View>}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FF', padding: 16 },
  item: { backgroundColor: 'white', borderRadius: 14, padding: 14 }
});
