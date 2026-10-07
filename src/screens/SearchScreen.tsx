import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

import { useState } from 'react';

import { useMusic } from '../context/MusicContext';

export default function SearchScreen({
  navigation,
}: any) {
  const {
    musicas,
    setCurrentMusic,
  } = useMusic();

  const [pesquisa, setPesquisa] =
    useState('');

  const resultados = musicas.filter(
    (music) => {
      const texto =
        pesquisa.toLowerCase().trim();

      if (!texto) {
        return true;
      }

      return (
        music.title
          .toLowerCase()
          .includes(texto) ||
        music.artist
          .toLowerCase()
          .includes(texto) ||
        music.album
          .toLowerCase()
          .includes(texto)
      );
    }
  );

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
        <Text style={styles.smallTitle}>
          MUSICCR
        </Text>

        <Text style={styles.title}>
          Pesquisa
        </Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>
          🔎
        </Text>

        <TextInput
          value={pesquisa}
          onChangeText={setPesquisa}
          placeholder="Pesquisar música ou artista"
          placeholderTextColor="#777A7D"
          style={styles.input}
        />

        {pesquisa.length > 0 && (
          <Pressable
            onPress={() => setPesquisa('')}
          >
            <Text style={styles.clear}>
              ×
            </Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.sectionTitle}>
        {pesquisa
          ? 'RESULTADOS'
          : 'TODAS AS MÚSICAS'}
      </Text>

      {resultados.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>
            ♪
          </Text>

          <Text style={styles.emptyTitle}>
            Nenhuma música encontrada
          </Text>

          <Text style={styles.emptyText}>
            Tente pesquisar outro nome ou artista.
          </Text>
        </View>
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.musicCard}
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
                  style={styles.coverPlaceholder}
                >
                  <Text style={styles.coverIcon}>
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

              <Text style={styles.arrow}>
                ›
              </Text>
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

  searchBox: {
    marginHorizontal: 18,
    marginBottom: 25,
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: '#17191C',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },

  clear: {
    color: '#777A7D',
    fontSize: 27,
    lineHeight: 27,
  },

  sectionTitle: {
    marginHorizontal: 22,
    marginBottom: 12,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
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

  arrow: {
    color: '#777A7D',
    fontSize: 27,
    marginRight: 5,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    color: '#F4510B',
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 17,
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
