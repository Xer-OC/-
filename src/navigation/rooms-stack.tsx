import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoomListScreen } from '../screens/rooms/room-list-screen';
import { RoomViewScreen } from '../screens/rooms/room-view-screen';
import { SpatialRoomScreen } from '../screens/SpatialRoomScreen';

const Stack = createNativeStackNavigator();

export function RoomsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RoomList" component={RoomListScreen} options={{ title: 'Rooms' }} />
      <Stack.Screen name="RoomView" component={RoomViewScreen} options={{ title: 'Watch Room' }} />
      <Stack.Screen name="SpatialRoom" component={SpatialRoomScreen} options={{ title: 'Spatial Room' }} />
    </Stack.Navigator>
  );
}
