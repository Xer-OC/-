import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FarmScreen } from '../screens/farm/farm-screen';
import { FarmDetailScreen } from '../screens/farm/farm-detail-screen';
import { InventoryScreen } from '../screens/farm/inventory-screen';

const Stack = createNativeStackNavigator();

export function FarmStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FarmHome" component={FarmScreen} options={{ title: 'Farm' }} />
      <Stack.Screen name="FarmDetail" component={FarmDetailScreen} options={{ title: 'Farm Detail' }} />
      <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
    </Stack.Navigator>
  );
}
