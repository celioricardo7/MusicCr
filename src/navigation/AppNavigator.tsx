import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Principal"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#0B0C0E',
        },
      }}
    >

      {/* APLICAÇÃO PRINCIPAL */}

      <Stack.Screen
        name="Principal"
        component={MainTabs}
      />

      {/* PLAYER */}

      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
        }}
      />

    </Stack.Navigator>
  );
}