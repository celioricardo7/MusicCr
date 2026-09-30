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
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { useMusic } from '../context/MusicContext';
import { musics } from '../data/musics';

export default function PlayerScreen({
  route,
  navigation,
}: any) {
  const selectedMusic =
    route.params?.music;

  const firstMusic =
    selectedMusic || musics[0];

  const getInitialIndex = () => {
    const index = musics.findIndex(
      (item) =>
        item.id === firstMusic.id
    );

    return index >= 0 ? index : 0;
  };

  const [currentIndex, setCurrentIndex] =
    useState(getInitialIndex);

  const {
    currentMusic,
    setCurrentMusic,
    audioPlayer,
    playMusic,
    pauseMusic,
  } = useMusic();

  const status =
    useAudioPlayerStatus(
      audioPlayer
    );

  const music =
    musics[currentIndex];

  /*
   * Sincroniza a música atual
   * com o Context.
   */
  useEffect(() => {
    if (
      !currentMusic ||
      currentMusic.id !== music.id
    ) {
      setCurrentMusic(music);
    }
  }, [
    music.id,
    currentMusic?.id,
  ]);

  /*
   * Quando o Player recebe foco novamente,
   * verifica o estado REAL do player.
   *
   * Se a música estiver parada, reproduz.
   */
  useFocusEffect(
    useCallback(() => {
      const timer =
        setTimeout(() => {
          if (
            audioPlayer &&
            !status.playing
          ) {
            console.log(
              'PLAYER: retomando música ao voltar'
            );

            audioPlayer.play();
          }
        }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, [
      audioPlayer,
      status.playing,
      music.id,
    ])
  );

  /*
   * Quando muda de música,
   * inicia a nova faixa.
   */
  useEffect(() => {
    if (!audioPlayer) {
      return;
    }

    const timer =
      setTimeout(() => {
        if (!status.playing) {
          audioPlayer.play();
        }
      }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [
    music.id,
    audioPlayer,
  ]);

  /*
   * Detecta o fim da música.
   */
  useEffect(() => {
    if (!status.didJustFinish) {
      return;
    }

    console.log(
      'MÚSICA TERMINOU:',
      music.title
    );

    nextMusic();
  }, [
    status.didJustFinish,
  ]);

  /*
   * Próxima.
   */
  function nextMusic() {
    setCurrentIndex(
      (index) => {
        if (
          index <
          musics.length - 1
        ) {
          return index + 1;
        }

        return 0;
      }
    );
  }

  /*
   * Anterior.
   */
  function previousMusic() {
    setCurrentIndex(
      (index) => {
        if (index > 0) {
          return index - 1;
        }

        return musics.length - 1;
      }
    );
  }

  /*
   * Selecionar música.
   */
  function selectMusic(
    index: number
  ) {
    setCurrentIndex(index);
  }

  /*
   * Play / Pause.
   */
  function togglePlay() {
    if (status.playing) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  /*
   * Formatação do tempo.
   */
  function formatTime(
    seconds: number
  ) {
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

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Pressable
          style={styles.headerButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text
            style={styles.headerIcon}
          >
            ⌄
          </Text>
        </Pressable>

        <Text
          style={styles.headerTitle}
        >
          TOCANDO AGORA
        </Text>

        <Pressable
          style={styles.headerButton}
        >
          <Text
            style={styles.headerIcon}
          >
            ⋮
          </Text>
        </Pressable>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        <View
          style={
            styles.coverWrapper
          }
        >
          <Image
            source={music.cover}
            style={styles.cover}
          />
        </View>

        <View
          style={styles.musicInfo}
        >

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

        <View
          style={
            styles.progressSection
          }
        >

          <View
            style={
              styles.progressBackground
            }
          >
            <View
              style={[
                styles.progress,
                {
                  width: `${
                    Math.min(
                      Math.max(
                        progress,
                        0
                      ),
                      1
                    ) * 100
                  }%`,
                },
              ]}
            />
          </View>

          <View
            style={styles.timeRow}
          >

            <Text
              style={styles.time}
            >
              {formatTime(
                currentTime
              )}
            </Text>

            <Text
              style={styles.time}
            >
              {formatTime(
                duration
              )}
            </Text>

          </View>

        </View>

        <View
          style={styles.controls}
        >

          <Pressable
            style={
              styles.secondaryButton
            }
            onPress={
              previousMusic
            }
          >
            <Text
              style={
                styles.secondaryIcon
              }
            >
              |◀
            </Text>
          </Pressable>

          <Pressable
            style={
              styles.playButton
            }
            onPress={togglePlay}
          >
            <Text
              style={styles.playIcon}
            >
              {status.playing
                ? 'Ⅱ'
                : '▶'}
            </Text>
          </Pressable>

          <Pressable
            style={
              styles.secondaryButton
            }
            onPress={nextMusic}
          >
            <Text
              style={
                styles.secondaryIcon
              }
            >
              ▶|
            </Text>
          </Pressable>

        </View>

        <View
          style={
            styles.upNextSection
          }
        >

          <Text
            style={styles.sectionTitle}
          >
            UP NEXT
          </Text>

          {musics.map(
            (item, index) => {

              if (
                index ===
                currentIndex
              ) {
                return null;
              }

              return (
                <Pressable
                  key={item.id}
                  style={
                    styles.nextItem
                  }
                  onPress={() =>
                    selectMusic(
                      index
                    )
                  }
                >

                  <Image
                    source={
                      item.cover
                    }
                    style={
                      styles.nextCover
                    }
                  />

                  <View
                    style={
                      styles.nextInfo
                    }
                  >

                    <Text
                      style={
                        styles.nextTitle
                      }
                      numberOfLines={
                        1
                      }
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={
                        styles.nextArtist
                      }
                      numberOfLines={
                        1
                      }
                    >
                      {item.artist}
                    </Text>

                  </View>

                  <Text
                    style={
                      styles.nextArrow
                    }
                  >
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

  header: {
    height: 72,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent:
      'center',
  },

  headerIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  coverWrapper: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent:
      'center',
  },

  cover: {
    width: 290,
    height: 290,
    borderRadius: 145,
    borderWidth: 8,
    borderColor: '#16181B',
  },

  musicInfo: {
    marginTop: 30,
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },

  artist: {
    marginTop: 8,
    color: '#F4510B',
    fontSize: 16,
    fontWeight: '600',
  },

  album: {
    marginTop: 5,
    color: '#777A7D',
    fontSize: 13,
  },

  progressSection: {
    marginTop: 30,
  },

  progressBackground: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#292C30',
    overflow: 'hidden',
  },

  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#F4510B',
  },

  timeRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  time: {
    color: '#777A7D',
    fontSize: 12,
  },

  controls: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'center',
    gap: 30,
  },

  secondaryButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#15171A',
    alignItems: 'center',
    justifyContent:
      'center',
  },

  secondaryIcon: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },

  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F4510B',
    alignItems: 'center',
    justifyContent:
      'center',
  },

  playIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  upNextSection: {
    marginTop: 40,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 16,
  },

  nextItem: {
    minHeight: 70,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#121417',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nextCover: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  nextInfo: {
    flex: 1,
    marginLeft: 14,
  },

  nextTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  nextArtist: {
    marginTop: 4,
    color: '#777A7D',
    fontSize: 12,
  },

  nextArrow: {
    color: '#777A7D',
    fontSize: 28,
    marginLeft: 10,
  },
});