import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import { useMusic } from '../context/MusicContext';

export default function MiniPlayer() {
  const navigation = useNavigation<any>();

  const {
    currentMusic,
    isPlaying,
    playMusic,
    pauseMusic,
  } = useMusic();

  if (!currentMusic) {
    return null;
  }

  function abrirPlayer() {
    let navigator = navigation;

    while (navigator) {
      const state = navigator.getState?.();

      const encontrouPlayer =
        state?.routeNames?.includes('Player');

      if (encontrouPlayer) {
        navigator.navigate('Player', {
          music: currentMusic,
        });

        return;
      }

      navigator = navigator.getParent?.();
    }

    console.log(
      'Não foi possível encontrar a tela Player.'
    );
  }

  function alternarPlay() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={abrirPlayer}
    >
      {currentMusic.cover ? (
        <Image
          source={{
            uri: currentMusic.cover,
          }}
          style={styles.cover}
        />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverIcon}>
            ♪
          </Text>
        </View>
      )}

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {currentMusic.title}
        </Text>

        <Text
          style={styles.artist}
          numberOfLines={1}
        >
          {currentMusic.artist}
        </Text>
      </View>

      <Pressable
        style={styles.playButton}
        onPress={(event) => {
          event.stopPropagation();
          alternarPlay();
        }}
      >
        <Text style={styles.playIcon}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: 12,
    right: 12,

    /*
     * Fica acima da barra
     * de navegação inferior.
     */
    bottom: 75,

    height: 64,

    paddingHorizontal: 8,

    borderRadius: 16,

    backgroundColor: '#181A1D',

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 8,

    shadowOpacity: 0.3,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cover: {
    width: 48,
    height: 48,
    borderRadius: 9,
  },

  coverPlaceholder: {
    width: 48,
    height: 48,

    borderRadius: 9,

    backgroundColor: '#25282C',

    alignItems: 'center',
    justifyContent: 'center',
  },

  coverIcon: {
    color: '#F4510B',
    fontSize: 22,
    fontWeight: '700',
  },

  info: {
    flex: 1,

    marginLeft: 11,
    marginRight: 8,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 13,
    fontWeight: '700',
  },

  artist: {
    marginTop: 4,

    color: '#8A8D91',

    fontSize: 11,
  },

  playButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: '#F4510B',

    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '800',
  },
});