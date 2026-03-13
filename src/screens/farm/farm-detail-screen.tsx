import { Pressable, StyleSheet, Text, View } from 'react-native';

export function FarmDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}><Text style={{ fontSize: 56 }}>🦊</Text></View>
      <Text style={styles.title}>Sky Berry Fox</Text>
      <View style={styles.bar}><View style={styles.fill} /></View>
      <Text style={styles.meta}>Growth 42% • Energy 76 • Mood Happy</Text>
      <View style={styles.actions}>
        <Pressable style={styles.action}><Text>Feed</Text></Pressable>
        <Pressable style={styles.action}><Text>Gift</Text></Pressable>
        <Pressable style={styles.action}><Text>Share</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FF', padding: 20 },
  illustration: { height: 220, borderRadius: 28, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginTop: 16 },
  bar: { marginTop: 14, height: 12, borderRadius: 100, backgroundColor: '#DDE5FF' },
  fill: { width: '42%', height: '100%', borderRadius: 100, backgroundColor: '#22C55E' },
  meta: { marginTop: 10, color: '#64748B' },
  actions: { marginTop: 20, flexDirection: 'row', gap: 10 },
  action: { flex: 1, backgroundColor: 'white', borderRadius: 14, paddingVertical: 12, alignItems: 'center' }
});
