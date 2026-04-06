import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clapperboard, MessageCircle, Sprout, Users } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { GlassButton } from '../components/GlassButton';
import { GlassCard } from '../components/GlassCard';
import { backgrounds } from '../ui/backgrounds';
import { theme } from '../ui/theme';
import { useResponsive } from '../utils/useResponsive';

export function HomeDashboardScreen() {
  const navigation = useNavigation();
  const { gridGap, containerMaxWidth, titleSize, cardTitleSize, cardDescriptionSize } = useResponsive();

  const cards = [
    {
      title: 'Video Feed',
      description: 'Vertical short-form aggregation with quick source switching.',
      icon: <Clapperboard color={theme.colors.textPrimary} size={20} />,
      onPress: () => navigation.navigate('Feed' as never)
    },
    {
      title: 'Social Rooms',
      description: 'Watch-together room with live chat and reactions.',
      icon: <Users color={theme.colors.textPrimary} size={20} />,
      onPress: () => navigation.navigate('Rooms' as never)
    },
    {
      title: 'Cloud Farm',
      description: 'Shared farm card with growth and cooperative actions.',
      icon: <Sprout color={theme.colors.textPrimary} size={20} />,
      onPress: () => navigation.navigate('Farm' as never)
    },
    {
      title: 'Unified Messages',
      description: 'Telegram + Discord + WhatsApp-ready inbox panel.',
      icon: <MessageCircle color={theme.colors.textPrimary} size={20} />,
      onPress: () => navigation.navigate('Messages' as never)
    }
  ];

  return (
    <LinearGradient colors={backgrounds.aurora} style={styles.screen}>
      <View style={[styles.container, { maxWidth: containerMaxWidth }]}> 
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: titleSize }]}>SocialFarm Glass UI</Text>
          <Text style={styles.subtitle}>Floating translucent cards inspired by modern iOS system surfaces.</Text>
        </View>

        <View style={[styles.grid, { gap: gridGap }]}> 
          <View style={styles.row}>
            {cards.slice(0, 2).map((card, idx) => (
              <GlassCard key={card.title} style={styles.card} depthLevel={idx === 0 ? 1 : 0.6}>
                <View style={styles.iconWrap}>{card.icon}</View>
                <Text style={[styles.cardTitle, { fontSize: cardTitleSize }]}>{card.title}</Text>
                <Text style={[styles.cardDescription, { fontSize: cardDescriptionSize }]}>{card.description}</Text>
                <GlassButton label="Open" onPress={card.onPress} />
              </GlassCard>
            ))}
          </View>
          <View style={styles.row}>
            {cards.slice(2, 4).map((card, idx) => (
              <GlassCard key={card.title} style={styles.card} depthLevel={idx === 0 ? 0.4 : 0}>
                <View style={styles.iconWrap}>{card.icon}</View>
                <Text style={[styles.cardTitle, { fontSize: cardTitleSize }]}>{card.title}</Text>
                <Text style={[styles.cardDescription, { fontSize: cardDescriptionSize }]}>{card.description}</Text>
                <GlassButton label="Open" onPress={card.onPress} />
              </GlassCard>
            ))}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: 52,
    paddingBottom: theme.spacing.md
  },
  header: { marginBottom: theme.spacing.lg },
  title: { color: theme.colors.textPrimary, fontWeight: '800' },
  subtitle: {
    marginTop: theme.spacing.sm + 2,
    color: 'rgba(226,232,240,0.85)',
    ...theme.typography.body,
    lineHeight: 22,
    maxWidth: 680
  },
  grid: { flex: 1 },
  row: { flex: 1, flexDirection: 'row', gap: theme.spacing.sm + 4 },
  card: {
    flex: 1,
    justifyContent: 'space-between'
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginBottom: 10
  },
  cardTitle: { color: theme.colors.textPrimary, fontWeight: '700' },
  cardDescription: { color: 'rgba(226,232,240,0.82)', lineHeight: 20, marginVertical: 10 }
});
