import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

import { musics } from '../data/musics';
import { useMusic } from '../context/MusicContext';

export default function LibraryScreen({
  navigation,
}: any) {
  const {
    setCurrentMusic,
    favorites,
    playlist,
    addFavorite,
    removeFavorite,
    addToPlaylist,
    removeFromPlaylist,
  } = useMusic();

  function openPlayer(music: any) {
    setCurrentMusic(music);

    navigation.getParent()?.navigate('Player', {
      music,
    });
  }

  function toggleFavorite(music: any) {
    const exists = favorites.some(
      (item) => item.id === music.id
    );

    if (exists) {
      removeFavorite(music.id);
    } else {
      addFavorite(music);
    }
  }

  function togglePlaylist(music: any) {
    const exists = playlist.some(
      (item) => item.id === music.id
    );

    if (exists) {
      removeFromPlaylist(music.id);
    } else {
      addToPlaylist(music);
    }
  }

  function isFavorite(music: any) {
    return favorites.some(
      (item) => item.id === music.id
    );
  }

  function isInPlaylist(music: any) {
    return playlist.some(
      (item) => item.id === music.id
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            MUSICCR
          </Text>

          <Text style={styles.title}>
            Biblioteca
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {musics.length}
          </Text>
        </View>
      </View>

      {/* DESCRIÇÃO */}

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Todas as músicas disponíveis no seu
          dispositivo.
        </Text>
      </View>

      {/* LISTA */}

      <FlatList
        data={musics}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.musicCard}>

            <Pressable
              style={styles.musicMain}
              onPress={() => openPlayer(item)}
            >

              <View style={styles.numberContainer}>
                <Text style={styles.number}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>

              <Image
                source={item.cover}
                style={styles.cover}
              />

              <View style={styles.info}>

                <Text
                  style={styles.musicTitle}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <Text
                  style={styles.artist}
                  numberOfLines={1}
                >
                  {item.artist}
                </Text>

                <Text
                  style={styles.album}
                  numberOfLines={1}
                >
                  {item.album}
                </Text>

              </View>

            </Pressable>

            {/* AÇÕES */}

            <View style={styles.actions}>

              <Pressable
                style={[
                  styles.actionButton,
                  isFavorite(item) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  toggleFavorite(item)
                }
              >
                <Text
                  style={[
                    styles.actionIcon,
                    isFavorite(item) &&
                      styles.activeActionText,
                  ]}
                >
                  {isFavorite(item) ? '♥' : '♡'}
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.actionButton,
                  isInPlaylist(item) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  togglePlaylist(item)
                }
              >
                <Text
                  style={[
                    styles.actionIcon,
                    isInPlaylist(item) &&
                      styles.activeActionText,
                  ]}
                >
                  {isInPlaylist(item) ? '✓' : '+'}
                </Text>
              </Pressable>

            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C0E',
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallTitle: {
    color: '#F4510B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  countBadge: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 21,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    color: '#F4510B',
    fontSize: 15,
    fontWeight: '800',
  },

  descriptionContainer: {
    paddingHorizontal: 22,
    marginBottom: 15,
  },

  description: {
    color: '#777A7D',
    fontSize: 13,
    lineHeight: 19,
  },

  list: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  musicCard: {
    minHeight: 82,
    marginBottom: 11,
    padding: 9,
    borderRadius: 18,
    backgroundColor: '#121417',
    flexDirection: 'row',
    alignItems: 'center',
  },

  musicMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  numberContainer: {
    width: 27,
    alignItems: 'center',
  },

  number: {
    color: '#55595D',
    fontSize: 10,
    fontWeight: '700',
  },

  cover: {
    width: 58,
    height: 58,
    borderRadius: 11,
  },

  info: {
    flex: 1,
    marginLeft: 13,
    marginRight: 5,
  },

  musicTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  artist: {
    marginTop: 5,
    color: '#F4510B',
    fontSize: 11,
    fontWeight: '600',
  },

  album: {
    marginTop: 3,
    color: '#777A7D',
    fontSize: 10,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: '#191B1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  activeAction: {
    backgroundColor: '#2A1A14',
  },

  actionIcon: {
    color: '#777A7D',
    fontSize: 18,
    fontWeight: '700',
  },

  activeActionText: {
    color: '#F4510B',
  },
});