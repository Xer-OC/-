import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, Heart, Search, Share2 } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { trackEvent } from '../../services/analyticsService';
import { getUnifiedFeed } from '../../services/videoFeedService';
import { IconButton } from '../../ui/components/IconButton';
import { theme } from '../../ui/theme';
import { UnifiedVideo } from '../../videoSources/VideoSourceAdapter';

export function FeedScreen() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);
  const [feed, setFeed] = useState<UnifiedVideo[]>([]);
  const scale = useSharedValue(1);

  useEffect(() => {
    trackEvent('app_open');
    void getUnifiedFeed().then(setFeed);
  }, []);

  const video = useMemo(() => (feed.length ? feed[active % feed.length] : null), [active, feed]);
  const next = () => setActive((v) => v + 1);
  const prev = () => setActive((v) => (v === 0 ? Math.max(feed.length - 1, 0) : v - 1));

  const onDoubleTapLike = () => {
    setLiked(true);
    trackEvent('video_watch', { source: video?.source });
    scale.value = 1.3;
    scale.value = withTiming(1, { duration: theme.animations.normal });
  };

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <LinearGradient colors={[theme.colors.surface, theme.colors.background]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SocialFarm Feed</Text>
        <Search size={20} color={theme.colors.textSecondary} />
      </View>
      <Pressable style={styles.video} onLongPress={next} onPress={prev} onPressOut={onDoubleTapLike}>
        <Text style={styles.preview}>{video ? `Muted autoplay preview • ${video.source}` : 'Loading unified feed...'}</Text>
        <Animated.View style={[styles.likeBubble, style]}>
          <Heart size={40} color={liked ? '#F43F5E' : '#CBD5E1'} />
        </Animated.View>
        <View style={styles.overlay}>
          <Text style={styles.title}>{video?.title ?? 'Preparing content...'}</Text>
          <Text style={styles.desc}>{video ? `${video.creator} • ${video.description}` : 'Connecting adapters: Douyin / Kuaishou / Xiaohongshu'}</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        <IconButton icon={<Heart size={22} color={theme.colors.textPrimary} />} />
        <IconButton icon={<Share2 size={22} color={theme.colors.textPrimary} />} />
        <IconButton icon={<Bookmark size={22} color={theme.colors.textPrimary} />} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: theme.spacing.md, paddingTop: 56, paddingBottom: theme.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.sm + 6 },
  logo: { ...theme.typography.titleMedium, color: theme.colors.textPrimary },
  video: {
    flex: 1,
    borderRadius: theme.radius.xl,
    backgroundColor: '#0B1220',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  preview: { color: '#BFDBFE', ...theme.typography.caption },
  likeBubble: { alignSelf: 'center' },
  overlay: { marginTop: 'auto' },
  title: { color: theme.colors.textPrimary, ...theme.typography.titleMedium, fontSize: 24 },
  desc: { color: theme.colors.textSecondary, marginTop: theme.spacing.xs },
  actions: { position: 'absolute', right: 26, top: '46%', gap: theme.spacing.sm }
});
