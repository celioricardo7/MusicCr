import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { musics } from '../data/musics';
import { useMusic } from '../context/MusicContext';

export default function HomeScreen({
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

  const featuredMusic = musics[0];

  function openPlayer(music: any) {
    setCurrentMusic(music);

    navigation.getParent()?.navigate('Player', {
      music,
    });
  }

  function toggleFavorite(music: any) {
    const isFavorite = favorites.some(
      (item) => item.id === music.id
    );

    if (isFavorite) {
      removeFavorite(music.id);
    } else {
      addFavorite(music);
    }
  }

  function togglePlaylist(music: any) {
    const isInPlaylist = playlist.some(
      (item) => item.id === music.id
    );

    if (isInPlaylist) {
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              MUSICCR
            </Text>

            <Text style={styles.title}>
              Ouça a sua música
            </Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>
              MC
            </Text>
          </View>
        </View>

        {/* DESTAQUE */}

        <Text style={styles.sectionTitle}>
          DESTAQUE
        </Text>

        <Pressable
          style={styles.featuredCard}
          onPress={() => openPlayer(featuredMusic)}
        >
          <Image
            source={featuredMusic.cover}
            style={styles.featuredCover}
          />

          <View style={styles.featuredOverlay} />

          <View style={styles.featuredInfo}>
            <Text style={styles.featuredLabel}>
              TOQUE AGORA
            </Text>

            <Text
              style={styles.featuredTitle}
              numberOfLines={2}
            >
              {featuredMusic.title}
            </Text>

            <Text style={styles.featuredArtist}>
              {featuredMusic.artist}
            </Text>
          </View>

          <View style={styles.featuredPlay}>
            <Text style={styles.featuredPlayIcon}>
              ▶
            </Text>
          </View>
        </Pressable>

        {/* MÚSICAS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            TODAS AS MÚSICAS
          </Text>

          <Text style={styles.songCount}>
            {musics.length}
          </Text>
        </View>

        {musics.map((music, index) => (
          <View
            key={music.id}
            style={styles.musicCard}
          >

            <Pressable
              style={styles.musicMain}
              onPress={() => openPlayer(music)}
            >
              <View style={styles.numberContainer}>
                <Text style={styles.number}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>

              <Image
                source={music.cover}
                style={styles.cover}
              />

              <View style={styles.musicInfo}>
                <Text
                  style={styles.musicTitle}
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

                <Text
                  style={styles.album}
                  numberOfLines={1}
                >
                  {music.album}
                </Text>
              </View>
            </Pressable>

            {/* AÇÕES */}

            <View style={styles.actions}>

              <Pressable
                style={[
                  styles.actionButton,
                  isFavorite(music) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  toggleFavorite(music)
                }
              >
                <Text
                  style={[
                    styles.actionIcon,
                    isFavorite(music) &&
                      styles.activeActionText,
                  ]}
                >
                  {isFavorite(music) ? '♥' : '♡'}
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.actionButton,
                  isInPlaylist(music) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  togglePlaylist(music)
                }
              >
                <Text
                  style={[
                    styles.actionIcon,
                    isInPlaylist(music) &&
                      styles.activeActionText,
                  ]}
                >
                  {isInPlaylist(music) ? '✓' : '+'}
                </Text>
              </Pressable>

            </View>

          </View>
        ))}

        <View style={styles.bottomSpace} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C0E',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  greeting: {
    color: '#F4510B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
  },

  title: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },

  profile: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#17191C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 14,
  },

  featuredCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#15171A',
    position: 'relative',
    marginBottom: 30,
  },

  featuredCover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  featuredOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  featuredInfo: {
    position: 'absolute',
    left: 20,
    right: 80,
    bottom: 20,
  },

  featuredLabel: {
    color: '#F4510B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  featuredTitle: {
    marginTop: 7,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  featuredArtist: {
    marginTop: 5,
    color: '#D2D2D2',
    fontSize: 13,
  },

  featuredPlay: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F4510B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  featuredPlayIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  songCount: {
    marginLeft: 8,
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#17191C',
    color: '#777A7D',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 5,
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

  musicInfo: {
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
    marginLeft: 4,
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

  bottomSpace: {
    height: 30,
  },
});