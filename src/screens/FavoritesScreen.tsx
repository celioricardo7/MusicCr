import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

import { useMusic } from '../context/MusicContext';

export default function FavoritesScreen({
  navigation,
}: any) {
  const {
    favorites,
    setCurrentMusic,
    removeFavorite,
  } = useMusic();

  function abrirPlayer(music: any) {
    setCurrentMusic(music);

    navigation
      .getParent()
      ?.navigate('Player', {
        music,
      });
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            MUSICCR
          </Text>

          <Text style={styles.title}>
            Favoritos
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {favorites.length}
          </Text>
        </View>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>
            ♡
          </Text>

          <Text style={styles.emptyTitle}>
            Ainda não tens favoritos
          </Text>

          <Text style={styles.emptyText}>
            As músicas que marcares com coração
            aparecerão aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.musicCard}>

              <Pressable
                style={styles.musicMain}
                onPress={() =>
                  abrirPlayer(item)
                }
              >
                <Text style={styles.number}>
                  {String(index + 1).padStart(
                    2,
                    '0'
                  )}
                </Text>

                {item.cover ? (
                  <Image
                    source={{
                      uri: item.cover,
                    }}
                    style={styles.cover}
                  />
                ) : (
                  <View
                    style={
                      styles.coverPlaceholder
                    }
                  >
                    <Text
                      style={styles.coverIcon}
                    >
                      ♪
                    </Text>
                  </View>
                )}

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

              <Pressable
                style={styles.favoriteButton}
                onPress={() =>
                  removeFavorite(item.id)
                }
              >
                <Text style={styles.favoriteIcon}>
                  ♥
                </Text>
              </Pressable>

            </View>
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
    paddingBottom: 20,
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

  list: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  musicCard: {
    minHeight: 78,
    marginBottom: 10,
    padding: 9,
    borderRadius: 17,
    backgroundColor: '#121417',
    flexDirection: 'row',
    alignItems: 'center',
  },

  musicMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  number: {
    width: 28,
    textAlign: 'center',
    color: '#55595D',
    fontSize: 10,
    fontWeight: '700',
  },

  cover: {
    width: 58,
    height: 58,
    borderRadius: 11,
  },

  coverPlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 11,
    backgroundColor: '#1C1F22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverIcon: {
    color: '#F4510B',
    fontSize: 25,
    fontWeight: '700',
  },

  info: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
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

  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A1A14',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteIcon: {
    color: '#F4510B',
    fontSize: 19,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },

  emptyIcon: {
    color: '#F4510B',
    fontSize: 55,
    marginBottom: 18,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  emptyText: {
    marginTop: 9,
    color: '#777A7D',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});