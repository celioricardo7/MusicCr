import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Music } from '../types/Music';
import { useMusic } from '../context/MusicContext';

type Props = {
  music: Music;
  onPress: () => void;
};

export default function MiniPlayer({
  music,
  onPress,
}: Props) {
  const {
    isPlaying,
    playMusic,
    pauseMusic,
  } = useMusic();

  function togglePlay() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  return (
    <View style={styles.container}>

      {/* Área que abre o Player */}
      <Pressable
        style={styles.musicArea}
        onPress={onPress}
      >
        <Image
          source={music.cover}
          style={styles.cover}
        />

        <View style={styles.info}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {music.title}
          </Text>

          <Text
            style={styles.artist}
            numberOfLines={1}
          >
            {music.artist}
          </Text>
        </View>
      </Pressable>

      {/* Reproduzir / Pausar */}
      <Pressable
        style={styles.playButton}
        onPress={togglePlay}
      >
        <Text style={styles.playText}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </Text>
      </Pressable>

      {/* Abrir Player */}
      <Pressable
        style={styles.openButton}
        onPress={onPress}
      >
        <Text style={styles.openText}>
          ↑
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: '#15171A',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#202328',
  },

  musicArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  cover: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  artist: {
    marginTop: 4,
    color: '#777A7D',
    fontSize: 11,
  },

  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4510B',
  },

  playText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  openButton: {
    width: 38,
    height: 42,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  openText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
});