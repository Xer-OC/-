import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatHomeScreen } from '../screens/ChatHomeScreen';
import { GlobalSearchScreen } from '../screens/GlobalSearchScreen';
import { IntegrationsScreen } from '../screens/IntegrationsScreen';
import { UnifiedNotificationCenter } from '../screens/UnifiedNotificationCenter';
import { PluginMarketplace } from '../screens/PluginMarketplace';
import { ConversationScreen } from '../screens/messages/conversation-screen';

const Stack = createNativeStackNavigator();

export function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatHome" component={ChatHomeScreen} options={{ title: 'Messages' }} />
      <Stack.Screen name="Conversation" component={ConversationScreen} options={{ title: 'Conversation' }} />
      <Stack.Screen name="GlobalSearch" component={GlobalSearchScreen} options={{ title: 'Global Search' }} />
      <Stack.Screen name="Integrations" component={IntegrationsScreen} options={{ title: 'Integrations' }} />
      <Stack.Screen name="UnifiedNotifications" component={UnifiedNotificationCenter} options={{ title: 'Notifications' }} />
      <Stack.Screen name="PluginMarketplace" component={PluginMarketplace} options={{ title: 'Plugins' }} />
    </Stack.Navigator>
  );
}
