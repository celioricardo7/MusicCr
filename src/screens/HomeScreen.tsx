import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { useMusic } from '../context/MusicContext';


export default function HomeScreen({
  navigation,
}: any) {

  const {
    musicas,
    setCurrentMusic,
    favorites,
    playlist,
    addFavorite,
    removeFavorite,
    addToPlaylist,
    removeFromPlaylist,
  } = useMusic();


  const featuredMusic =
    musicas[0];


  function openPlayer(
    music: any
  ) {

    setCurrentMusic(
      music
    );

    navigation
      .getParent()
      ?.navigate(
        'Player',
        {
          music,
        }
      );
  }


  function toggleFavorite(
    music: any
  ) {

    const exists =
      favorites.some(
        (item) =>
          item.id === music.id
      );

    if (exists) {

      removeFavorite(
        music.id
      );

    } else {

      addFavorite(
        music
      );

    }
  }


  function togglePlaylist(
    music: any
  ) {

    const exists =
      playlist.some(
        (item) =>
          item.id === music.id
      );

    if (exists) {

      removeFromPlaylist(
        music.id
      );

    } else {

      addToPlaylist(
        music
      );

    }
  }


  function isFavorite(
    music: any
  ) {

    return favorites.some(
      (item) =>
        item.id === music.id
    );
  }


  function isInPlaylist(
    music: any
  ) {

    return playlist.some(
      (item) =>
        item.id === music.id
    );
  }


  if (musicas.length === 0) {

    return (
      <View
        style={
          styles.emptyContainer
        }
      >

        <Text
          style={
            styles.emptyIcon
          }
        >
          ♪
        </Text>

        <Text
          style={
            styles.emptyTitle
          }
        >
          Carregando músicas...
        </Text>

        <Text
          style={
            styles.emptyText
          }
        >
          Aguarde um momento.
        </Text>

      </View>
    );

  }


  return (

    <View
      style={
        styles.container
      }
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >

          <View>

            <Text
              style={
                styles.logo
              }
            >
              MUSICCR
            </Text>

            <Text
              style={
                styles.title
              }
            >
              O que você quer ouvir?
            </Text>

          </View>


          <View
            style={
              styles.profile
            }
          >

            <Text
              style={
                styles.profileText
              }
            >
              MC
            </Text>

          </View>

        </View>


        {/* DESTAQUE */}

        <Text
          style={
            styles.sectionTitle
          }
        >
          DESTAQUE
        </Text>


        <Pressable
          style={
            styles.featuredCard
          }
          onPress={() =>
            openPlayer(
              featuredMusic
            )
          }
        >

          {featuredMusic.cover ? (

            <Image
              source={{
                uri:
                  featuredMusic.cover,
              }}
              style={
                styles.featuredCover
              }
            />

          ) : (

            <View
              style={
                styles.featuredPlaceholder
              }
            >

              <Text
                style={
                  styles.featuredIcon
                }
              >
                ♪
              </Text>

            </View>

          )}


          <View
            style={
              styles.featuredOverlay
            }
          />


          <View
            style={
              styles.featuredInfo
            }
          >

            <Text
              style={
                styles.featuredLabel
              }
            >
              TOQUE AGORA
            </Text>

            <Text
              style={
                styles.featuredTitle
              }
              numberOfLines={2}
            >
              {featuredMusic.title}
            </Text>

            <Text
              style={
                styles.featuredArtist
              }
              numberOfLines={1}
            >
              {featuredMusic.artist}
            </Text>

          </View>


          <View
            style={
              styles.featuredPlay
            }
          >

            <Text
              style={
                styles.featuredPlayIcon
              }
            >
              ▶
            </Text>

          </View>

        </Pressable>


        {/* FEITO PARA VOCÊ */}

        <Text
          style={
            styles.sectionTitle
          }
        >
          FEITO PARA VOCÊ
        </Text>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={
            styles.horizontalList
          }
        >

          {musicas.map(
            (music) => (

              <Pressable
                key={
                  music.id
                }
                style={
                  styles.smallCard
                }
                onPress={() =>
                  openPlayer(
                    music
                  )
                }
              >

                {music.cover ? (

                  <Image
                    source={{
                      uri:
                        music.cover,
                    }}
                    style={
                      styles.smallCover
                    }
                  />

                ) : (

                  <View
                    style={
                      styles.smallPlaceholder
                    }
                  >

                    <Text
                      style={
                        styles.smallIcon
                      }
                    >
                      ♪
                    </Text>

                  </View>

                )}


                <Text
                  style={
                    styles.smallTitle
                  }
                  numberOfLines={1}
                >
                  {music.title}
                </Text>


                <Text
                  style={
                    styles.smallArtist
                  }
                  numberOfLines={1}
                >
                  {music.artist}
                </Text>

              </Pressable>

            )
          )}

        </ScrollView>


        {/* TODAS AS MÚSICAS */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <Text
            style={
              styles.sectionTitle
            }
          >
            SUAS MÚSICAS
          </Text>

          <View
            style={
              styles.countBadge
            }
          >

            <Text
              style={
                styles.countText
              }
            >
              {musicas.length}
            </Text>

          </View>

        </View>


        {/* LISTA */}

        {musicas.map(
          (
            music,
            index
          ) => (

            <View
              key={
                music.id
              }
              style={
                styles.musicCard
              }
            >

              <Pressable
                style={
                  styles.musicMain
                }
                onPress={() =>
                  openPlayer(
                    music
                  )
                }
              >

                <View
                  style={
                    styles.numberContainer
                  }
                >

                  <Text
                    style={
                      styles.number
                    }
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      '0'
                    )}
                  </Text>

                </View>


                {music.cover ? (

                  <Image
                    source={{
                      uri:
                        music.cover,
                    }}
                    style={
                      styles.cover
                    }
                  />

                ) : (

                  <View
                    style={
                      styles.coverPlaceholder
                    }
                  >

                    <Text
                      style={
                        styles.coverIcon
                      }
                    >
                      ♪
                    </Text>

                  </View>

                )}


                <View
                  style={
                    styles.musicInfo
                  }
                >

                  <Text
                    style={
                      styles.musicTitle
                    }
                    numberOfLines={1}
                  >
                    {music.title}
                  </Text>

                  <Text
                    style={
                      styles.artist
                    }
                    numberOfLines={1}
                  >
                    {music.artist}
                  </Text>

                  <Text
                    style={
                      styles.album
                    }
                    numberOfLines={1}
                  >
                    {music.album}
                  </Text>

                </View>

              </Pressable>


              {/* FAVORITO */}

              <Pressable
                style={[
                  styles.actionButton,
                  isFavorite(
                    music
                  ) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  toggleFavorite(
                    music
                  )
                }
              >

                <Text
                  style={[
                    styles.actionIcon,
                    isFavorite(
                      music
                    ) &&
                      styles.activeActionText,
                  ]}
                >
                  {isFavorite(
                    music
                  )
                    ? '♥'
                    : '♡'}
                </Text>

              </Pressable>


              {/* PLAYLIST */}

              <Pressable
                style={[
                  styles.actionButton,
                  isInPlaylist(
                    music
                  ) &&
                    styles.activeAction,
                ]}
                onPress={() =>
                  togglePlaylist(
                    music
                  )
                }
              >

                <Text
                  style={[
                    styles.actionIcon,
                    isInPlaylist(
                      music
                    ) &&
                      styles.activeActionText,
                  ]}
                >
                  {isInPlaylist(
                    music
                  )
                    ? '✓'
                    : '+'}
                </Text>

              </Pressable>

            </View>

          )
        )}


        <View
          style={
            styles.bottomSpace
          }
        />

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


  logo: {
    color: '#F4510B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
  },


  title: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 26,
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


  featuredPlaceholder: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#17191C',
    alignItems: 'center',
    justifyContent: 'center',
  },


  featuredIcon: {
    color: '#F4510B',
    fontSize: 70,
    fontWeight: '700',
  },


  featuredOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor:
      'rgba(0, 0, 0, 0.45)',
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
    fontSize: 24,
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


  horizontalList: {
    marginBottom: 30,
  },


  smallCard: {
    width: 145,
    marginRight: 14,
  },


  smallCover: {
    width: 145,
    height: 145,
    borderRadius: 16,
  },


  smallPlaceholder: {
    width: 145,
    height: 145,
    borderRadius: 16,
    backgroundColor: '#17191C',
    alignItems: 'center',
    justifyContent: 'center',
  },


  smallIcon: {
    color: '#F4510B',
    fontSize: 45,
  },


  smallTitle: {
    marginTop: 9,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },


  smallArtist: {
    marginTop: 4,
    color: '#777A7D',
    fontSize: 11,
  },


  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },


  countBadge: {
    marginLeft: 9,
    minWidth: 25,
    height: 25,
    paddingHorizontal: 7,
    borderRadius: 13,
    backgroundColor: '#17191C',
    alignItems: 'center',
    justifyContent: 'center',
  },


  countText: {
    color: '#777A7D',
    fontSize: 11,
    fontWeight: '700',
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


  emptyContainer: {
    flex: 1,
    backgroundColor: '#0B0C0E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },


  emptyIcon: {
    color: '#F4510B',
    fontSize: 55,
    marginBottom: 15,
  },


  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },


  emptyText: {
    marginTop: 8,
    color: '#777A7D',
    fontSize: 13,
    textAlign: 'center',
  },

});