import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import MiniPlayer from '../components/MiniPlayer';

import { useMusic } from '../context/MusicContext';

const Tab = createBottomTabNavigator();

export default function MainTabs({
  navigation,
}: any) {
  const {
    currentMusic,
  } = useMusic();

  function openPlayer() {
    if (!currentMusic) {
      return;
    }

    navigation.navigate('Player', {
      music: currentMusic,
      autoPlay: true,
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.tabsContainer}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,

            tabBarStyle: styles.tabBar,

            tabBarActiveTintColor: '#F4510B',

            tabBarInactiveTintColor: '#777A7D',

            tabBarLabelStyle: styles.tabLabel,

            tabBarHideOnKeyboard: true,
          }}
        >

          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Início',

              tabBarIcon: ({ color }) => (
                <TabIcon
                  icon="⌂"
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Pesquisar',

              tabBarIcon: ({ color }) => (
                <TabIcon
                  icon="⌕"
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{
              tabBarLabel: 'Biblioteca',

              tabBarIcon: ({ color }) => (
                <TabIcon
                  icon="▤"
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={{
              tabBarLabel: 'Playlist',

              tabBarIcon: ({ color }) => (
                <TabIcon
                  icon="♫"
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              tabBarLabel: 'Favoritos',

              tabBarIcon: ({ color }) => (
                <TabIcon
                  icon="♡"
                  color={color}
                />
              ),
            }}
          />

        </Tab.Navigator>
      </View>

      {currentMusic && (
        <View style={styles.miniPlayerWrapper}>

          <MiniPlayer
            music={currentMusic}
            onPress={openPlayer}
          />

        </View>
      )}

    </View>
  );
}

function TabIcon({
  icon,
  color,
}: {
  icon: string;
  color: string;
}) {
  return (
    <View style={styles.iconContainer}>

      <Text
        style={[
          styles.icon,
          {
            color,
          },
        ]}
      >
        {icon}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C0E',
  },

  tabsContainer: {
    flex: 1,
  },

  miniPlayerWrapper: {
    backgroundColor: '#0B0C0E',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 4,
  },

  tabBar: {
    height: 64,
    paddingTop: 6,
    paddingBottom: 7,
    backgroundColor: '#101215',
    borderTopWidth: 1,
    borderTopColor: '#1E2125',
  },

  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
  },

  iconContainer: {
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 21,
    fontWeight: '700',
  },
});