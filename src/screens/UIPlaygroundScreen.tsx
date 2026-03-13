import { Search, Send } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FeatureCard } from '../components/FeatureCard';
import { FarmCard } from '../components/farm-card';
import { playgroundData } from '../mock/playgroundData';
import { Avatar } from '../ui/components/Avatar';
import { Badge } from '../ui/components/Badge';
import { Button } from '../ui/components/Button';
import { Card } from '../ui/components/Card';
import { IconButton } from '../ui/components/IconButton';
import { Input } from '../ui/components/Input';
import { PreviewBlock } from '../ui/components/PreviewBlock';
import { theme } from '../ui/theme';

export function UIPlaygroundScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>UI Playground</Text>
      <Text style={styles.pageSubtitle}>{playgroundData.sampleText.description}</Text>

      <PreviewBlock title="Buttons">
        <Button title="Primary Button" />
        <Button title="Secondary Button" variant="secondary" />
        <Button title="Disabled Button" disabled />
      </PreviewBlock>

      <PreviewBlock title="Cards">
        <FeatureCard
          title="Video Feed"
          description="Vertical short-form aggregation with quick source switching."
          icon={<Search color={theme.colors.textSecondary} size={18} />}
          onPress={() => undefined}
        />
        <Card>
          <Text style={styles.cardTitle}>Standard Card</Text>
          <Text style={styles.cardText}>{playgroundData.sampleText.title}</Text>
        </Card>
        <FarmCard />
      </PreviewBlock>

      <PreviewBlock title="Avatars">
        <Avatar label={playgroundData.avatars[0]} size={44} />
        <View style={styles.avatarGroup}>
          {playgroundData.avatars.map((avatar, index) => (
            <Avatar key={`${avatar}-${index}`} label={avatar} size={38} style={{ marginLeft: index === 0 ? 0 : -10 }} />
          ))}
        </View>
      </PreviewBlock>

      <PreviewBlock title="Inputs">
        <Input placeholder="Text Input" value={playgroundData.sampleText.title} />
        <View style={styles.inputRow}>
          <Input placeholder="Search Input" value={playgroundData.sampleText.search} style={{ flex: 1 }} />
          <IconButton icon={<Search color={theme.colors.textSecondary} size={18} />} />
        </View>
        <View style={styles.inputRow}>
          <Input placeholder="Chat Input" value={playgroundData.sampleText.chat} style={{ flex: 1 }} />
          <IconButton icon={<Send color={theme.colors.textSecondary} size={18} />} />
        </View>
      </PreviewBlock>

      <PreviewBlock title="Badges">
        <View style={styles.badgesRow}>
          <Badge text={playgroundData.badges.unread} />
          <Badge text={playgroundData.badges.notifications} style={{ backgroundColor: theme.colors.secondary }} />
        </View>
      </PreviewBlock>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl
  },
  pageTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.textPrimary
  },
  pageSubtitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
    ...theme.typography.body
  },
  cardTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs
  },
  cardText: {
    color: theme.colors.textSecondary
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing.sm
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  badgesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center'
  }
});
