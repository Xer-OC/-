import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatHomeScreen } from '../screens/ChatHomeScreen';
import { IntegrationsScreen } from '../screens/IntegrationsScreen';
import { ConversationScreen } from '../screens/messages/conversation-screen';

const Stack = createNativeStackNavigator();

export function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatHome" component={ChatHomeScreen} options={{ title: 'Messages' }} />
      <Stack.Screen name="Conversation" component={ConversationScreen} options={{ title: 'Conversation' }} />
      <Stack.Screen name="Integrations" component={IntegrationsScreen} options={{ title: 'Integrations' }} />
    </Stack.Navigator>
  );
}
