import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

import { useMusic } from '../context/MusicContext';

export default function PlaylistScreen({
  navigation,
}: any) {
  const {
    playlist,
    setCurrentMusic,
  } = useMusic();

  function openMusic(music: any) {
    setCurrentMusic(music);

    navigation.navigate('Player', {
      music,
    });
  }

  function playAll() {
    if (playlist.length === 0) {
      return;
    }

    const firstMusic = playlist[0];

    setCurrentMusic(firstMusic);

    navigation.navigate('Player', {
      music: firstMusic,
    });
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            SUA COLEÇÃO
          </Text>

          <Text style={styles.title}>
            Playlist
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {playlist.length}
          </Text>
        </View>
      </View>

      {/* BOTÃO REPRODUZIR */}

      {playlist.length > 0 && (
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.playAllButton}
            onPress={playAll}
          >
            <Text style={styles.playAllIcon}>
              ▶
            </Text>

            <Text style={styles.playAllText}>
              REPRODUZIR TUDO
            </Text>
          </Pressable>
        </View>
      )}

      {/* LISTA */}

      {playlist.length === 0 ? (
        <View style={styles.emptyContainer}>

          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>
              ♫
            </Text>
          </View>

          <Text style={styles.emptyTitle}>
            A playlist está vazia
          </Text>

          <Text style={styles.emptyText}>
            Adicione músicas à sua playlist
            para encontrá-las nesta secção.
          </Text>

          <Pressable
            style={styles.exploreButton}
            onPress={() =>
              navigation.navigate('Home')
            }
          >
            <Text style={styles.exploreText}>
              EXPLORAR MÚSICAS
            </Text>
          </Pressable>

        </View>
      ) : (
        <FlatList
          data={playlist}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.musicCard}
              onPress={() => openMusic(item)}
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

              <Pressable
                style={styles.playButton}
                onPress={() => openMusic(item)}
              >
                <Text style={styles.playIcon}>
                  ▶
                </Text>
              </Pressable>

            </Pressable>
          )}
        />
      )}

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
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallTitle: {
    color: '#777A7D',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
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

  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  playAllButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F4510B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playAllIcon: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 9,
  },

  playAllText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  list: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  musicCard: {
    minHeight: 82,
    marginBottom: 12,
    padding: 10,
    borderRadius: 18,
    backgroundColor: '#121417',
    flexDirection: 'row',
    alignItems: 'center',
  },

  numberContainer: {
    width: 28,
    alignItems: 'center',
  },

  number: {
    color: '#55595D',
    fontSize: 11,
    fontWeight: '700',
  },

  cover: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  musicTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  artist: {
    marginTop: 5,
    color: '#F4510B',
    fontSize: 12,
    fontWeight: '600',
  },

  album: {
    marginTop: 3,
    color: '#777A7D',
    fontSize: 11,
  },

  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F4510B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 2,
  },

  emptyContainer: {
    flex: 1,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },

  emptyIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  emptyIcon: {
    color: '#F4510B',
    fontSize: 42,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },

  emptyText: {
    marginTop: 10,
    color: '#777A7D',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  exploreButton: {
    marginTop: 25,
    paddingHorizontal: 22,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F4510B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  exploreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});