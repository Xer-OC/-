import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Clapperboard, FlaskConical, House, MessageCircle, Sprout, Users } from 'lucide-react-native';
import { GlassNavBarBackground, GlassNavIcon } from '../components/GlassNavBar';
import { HomeDashboardScreen } from '../screens/HomeDashboardScreen';
import { UIPlaygroundScreen } from '../screens/UIPlaygroundScreen';
import { FeedScreen } from '../screens/feed/feed-screen';
import { theme } from '../ui/theme';
import { FarmStack } from './farm-stack';
import { MessagesStack } from './messages-stack';
import { RoomsStack } from './rooms-stack';

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 84,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 14,
          backgroundColor: 'transparent'
        },
        tabBarBackground: () => <GlassNavBarBackground />,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.textSecondary
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeDashboardScreen}
        options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<House color={color} size={22} />} /> }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<Clapperboard color={color} size={22} />} /> }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsStack}
        options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<Users color={color} size={22} />} /> }}
      />
      <Tab.Screen
        name="Farm"
        component={FarmStack}
        options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<Sprout color={color} size={22} />} /> }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<MessageCircle color={color} size={22} />} /> }}
      />
      {__DEV__ ? (
        <Tab.Screen
          name="Playground"
          component={UIPlaygroundScreen}
          options={{ tabBarIcon: ({ color, focused }) => <GlassNavIcon focused={focused} icon={<FlaskConical color={color} size={22} />} /> }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
