import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import {
  useAudioPlayerStatus,
} from 'expo-audio';

import {
  useEffect,
  useState,
} from 'react';

import { useMusic } from '../context/MusicContext';

export default function PlayerScreen({
  route,
}: any) {
  const {
    musicas,
    currentMusic,
    setCurrentMusic,
    audioPlayer,
    playMusic,
    pauseMusic,
    favorites,
    addFavorite,
    removeFavorite,
  } = useMusic();

  const selectedMusic =
    route.params?.music;

  const firstMusic =
    selectedMusic ||
    currentMusic ||
    musicas[0];

  function getInitialIndex() {
    if (!firstMusic) {
      return 0;
    }

    const index =
      musicas.findIndex(
        (item) =>
          item.id === firstMusic.id
      );

    return index >= 0 ? index : 0;
  }

  const [currentIndex, setCurrentIndex] =
    useState(getInitialIndex);

  const [progressWidth, setProgressWidth] =
    useState(0);

  const status =
    useAudioPlayerStatus(audioPlayer);

  const music =
    musicas[currentIndex];

  useEffect(() => {
    if (!music) {
      return;
    }

    setCurrentMusic(music);
  }, [currentIndex, musicas]);

  useEffect(() => {
    if (!currentMusic) {
      return;
    }

    if (!currentMusic.audio) {
      return;
    }

    audioPlayer.play();
  }, [currentMusic]);

  useEffect(() => {
    if (!status.didJustFinish) {
      return;
    }

    nextMusic();
  }, [status.didJustFinish]);

  function nextMusic() {
    if (musicas.length === 0) {
      return;
    }

    setCurrentIndex((index) => {
      if (index < musicas.length - 1) {
        return index + 1;
      }

      return 0;
    });
  }

  function previousMusic() {
    if (musicas.length === 0) {
      return;
    }

    setCurrentIndex((index) => {
      if (index > 0) {
        return index - 1;
      }

      return musicas.length - 1;
    });
  }

  function selectMusic(index: number) {
    setCurrentIndex(index);
  }

  function togglePlay() {
    if (!music) {
      return;
    }

    if (!music.audio) {
      return;
    }

    if (status.playing) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function isFavorite() {
    if (!music) {
      return false;
    }

    return favorites.some(
      (item) =>
        item.id === music.id
    );
  }

  function toggleFavorite() {
    if (!music) {
      return;
    }

    if (isFavorite()) {
      removeFavorite(music.id);
    } else {
      addFavorite(music);
    }
  }

  function formatTime(seconds: number) {
    if (
      !Number.isFinite(seconds) ||
      seconds < 0
    ) {
      return '0:00';
    }

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  const duration =
    status.duration || 0;

  const currentTime =
    status.currentTime || 0;

  const progress =
    duration > 0
      ? currentTime / duration
      : 0;

  const progressPercent =
    Math.min(
      Math.max(progress, 0),
      1
    ) * 100;

  function mudarProgresso(
    x: number
  ) {
    if (
      progressWidth <= 0 ||
      duration <= 0
    ) {
      return;
    }

    const position =
      Math.max(
        0,
        Math.min(
          1,
          x / progressWidth
        )
      );

    audioPlayer.seekTo(
      position * duration
    );
  }

  if (!music) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>
          ♪
        </Text>

        <Text style={styles.emptyText}>
          Nenhuma música disponível.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerSmall}>
          MUSICCR
        </Text>

        <Text style={styles.headerTitle}>
          TOCANDO AGORA
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <View style={styles.coverContainer}>
          {music.cover ? (
            <Image
              source={{
                uri: music.cover,
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
        </View>

        <View style={styles.musicInfo}>
          <View style={styles.titleRow}>

            <View style={styles.titleContainer}>
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

              <Text
                style={styles.album}
                numberOfLines={1}
              >
                {music.album}
              </Text>
            </View>

            <Pressable
              style={styles.favoriteButton}
              onPress={toggleFavorite}
            >
              <Text
                style={
                  isFavorite()
                    ? styles.favoriteActive
                    : styles.favorite
                }
              >
                {isFavorite()
                  ? '♥'
                  : '♡'}
              </Text>
            </Pressable>

          </View>
        </View>

        <View style={styles.progressSection}>

          <View
            style={styles.progressContainer}
            onLayout={(event) => {
              setProgressWidth(
                event.nativeEvent.layout.width
              );
            }}
            onTouchStart={(event) => {
              mudarProgresso(
                event.nativeEvent.locationX
              );
            }}
            onTouchMove={(event) => {
              mudarProgresso(
                event.nativeEvent.locationX
              );
            }}
          >

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progress,
                  {
                    width:
                      `${progressPercent}%`,
                  },
                ]}
              />
            </View>

            <View
              style={[
                styles.progressThumb,
                {
                  left:
                    `${progressPercent}%`,
                },
              ]}
            />

          </View>

          <View style={styles.timeRow}>
            <Text style={styles.time}>
              {formatTime(currentTime)}
            </Text>

            <Text style={styles.time}>
              {formatTime(duration)}
            </Text>
          </View>

        </View>

        <View style={styles.controls}>

          <Pressable
            style={styles.controlButton}
            onPress={previousMusic}
          >
            <Text style={styles.previousIcon}>
              ‹‹
            </Text>
          </Pressable>

          <Pressable
            style={styles.playButton}
            onPress={togglePlay}
          >
            <Text style={styles.playIcon}>
              {status.playing
                ? 'Ⅱ'
                : '▶'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.controlButton}
            onPress={nextMusic}
          >
            <Text style={styles.nextIcon}>
              ››
            </Text>
          </Pressable>

        </View>

        <View style={styles.upNextSection}>

          <Text style={styles.sectionTitle}>
            PRÓXIMAS MÚSICAS
          </Text>

          {musicas.map(
            (item, index) => {

              if (
                index === currentIndex
              ) {
                return null;
              }

              return (
                <Pressable
                  key={item.id}
                  style={styles.nextItem}
                  onPress={() =>
                    selectMusic(index)
                  }
                >

                  {item.cover ? (
                    <Image
                      source={{
                        uri: item.cover,
                      }}
                      style={styles.nextCover}
                    />
                  ) : (
                    <View
                      style={
                        styles.nextCoverPlaceholder
                      }
                    >
                      <Text
                        style={
                          styles.nextCoverIcon
                        }
                      >
                        ♪
                      </Text>
                    </View>
                  )}

                  <View style={styles.nextInfo}>

                    <Text
                      style={styles.nextTitle}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={styles.nextArtist}
                      numberOfLines={1}
                    >
                      {item.artist}
                    </Text>

                  </View>

                  <Text style={styles.nextArrow}>
                    ›
                  </Text>

                </Pressable>
              );
            }
          )}

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C0E',
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: '#0B0C0E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    color: '#F4510B',
    fontSize: 55,
    marginBottom: 15,
  },

  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  header: {
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerSmall: {
    color: '#F4510B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 45,
  },

  coverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  cover: {
    width: 300,
    height: 300,
    borderRadius: 22,
  },

  coverPlaceholder: {
    width: 300,
    height: 300,
    borderRadius: 22,
    backgroundColor: '#16181B',
    borderWidth: 1,
    borderColor: '#292C30',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverIcon: {
    color: '#F4510B',
    fontSize: 80,
    fontWeight: '700',
  },

  musicInfo: {
    marginTop: 25,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  artist: {
    marginTop: 7,
    color: '#F4510B',
    fontSize: 16,
    fontWeight: '700',
  },

  album: {
    marginTop: 4,
    color: '#777A7D',
    fontSize: 13,
  },

  favoriteButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  favorite: {
    color: '#FFFFFF',
    fontSize: 27,
  },

  favoriteActive: {
    color: '#F4510B',
    fontSize: 27,
  },

  progressSection: {
    marginTop: 30,
  },

  progressContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },

  progressBackground: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#292C30',
    overflow: 'hidden',
  },

  progress: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#F4510B',
  },

  progressThumb: {
    position: 'absolute',
    top: 10,
    width: 10,
    height: 10,
    marginLeft: -5,
    borderRadius: 5,
    backgroundColor: '#F4510B',
  },

  timeRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  time: {
    color: '#777A7D',
    fontSize: 11,
  },

  controls: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },

  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previousIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  nextIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F4510B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  upNextSection: {
    marginTop: 40,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 14,
  },

  nextItem: {
    minHeight: 68,
    marginBottom: 9,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 15,
    backgroundColor: '#121417',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nextCover: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  nextCoverPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1C1F22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextCoverIcon: {
    color: '#F4510B',
    fontSize: 22,
    fontWeight: '700',
  },

  nextInfo: {
    flex: 1,
    marginLeft: 13,
  },

  nextTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  nextArtist: {
    marginTop: 4,
    color: '#777A7D',
    fontSize: 11,
  },

  nextArrow: {
    color: '#777A7D',
    fontSize: 27,
    marginLeft: 8,
  },
});