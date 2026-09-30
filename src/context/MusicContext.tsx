import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';

import { Music } from '../types/Music';

type MusicContextType = {
  playlist: Music[];
  favorites: Music[];

  currentMusic: Music | null;

  isPlaying: boolean;

  audioPlayer: any;

  setCurrentMusic: (music: Music) => void;
  setIsPlaying: (value: boolean) => void;

  playMusic: () => void;
  pauseMusic: () => void;

  addFavorite: (music: Music) => void;
  removeFavorite: (id: string) => void;

  addToPlaylist: (music: Music) => void;
  removeFromPlaylist: (id: string) => void;
};

const MusicContext = createContext(
  {} as MusicContextType
);

export function MusicProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [playlist, setPlaylist] =
    useState<Music[]>([]);

  const [favorites, setFavorites] =
    useState<Music[]>([]);

  const [currentMusic, setCurrentMusicState] =
    useState<Music | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  /*
   * O player permanece vivo enquanto
   * o MusicProvider estiver montado.
   */
  const audioPlayer = useAudioPlayer(
    currentMusic?.audio ?? null
  );

  const audioStatus =
    useAudioPlayerStatus(audioPlayer);

  /*
   * Mantém o estado global sincronizado
   * com o estado real do player.
   */
  useEffect(() => {
    setIsPlaying(
      audioStatus.playing
    );
  }, [audioStatus.playing]);

  /*
   * Define a música atual.
   *
   * Sempre que uma nova música é selecionada,
   * o estado de reprodução é reiniciado.
   */
  function setCurrentMusic(
    music: Music
  ) {
    if (
      currentMusic?.id === music.id
    ) {
      return;
    }

    /*
     * Primeiro informa que não estamos
     * reproduzindo a música anterior.
     */
    setIsPlaying(false);

    /*
     * Depois troca a música.
     *
     * O useAudioPlayer() detectará a alteração
     * da fonte e carregará o novo áudio.
     */
    setCurrentMusicState(music);
  }

  /*
   * Reproduzir.
   */
  function playMusic() {
    console.log(
      'CONTEXT: playMusic()'
    );

    if (!audioPlayer) {
      console.log(
        'CONTEXT: player ainda não disponível'
      );

      return;
    }

    console.log(
      'CONTEXT: player.play()'
    );

    audioPlayer.play();
  }

  /*
   * Pausar.
   */
  function pauseMusic() {
    console.log(
      'CONTEXT: pauseMusic()'
    );

    if (!audioPlayer) {
      setIsPlaying(false);

      return;
    }

    audioPlayer.pause();
  }

  /*
   * FAVORITOS
   */

  function addFavorite(
    music: Music
  ) {
    setFavorites(
      (currentFavorites) => {
        const alreadyFavorite =
          currentFavorites.some(
            (item) =>
              item.id === music.id
          );

        if (alreadyFavorite) {
          return currentFavorites;
        }

        return [
          ...currentFavorites,
          music,
        ];
      }
    );
  }

  function removeFavorite(
    id: string
  ) {
    setFavorites(
      (currentFavorites) =>
        currentFavorites.filter(
          (music) =>
            music.id !== id
        )
    );
  }

  /*
   * PLAYLIST
   */

  function addToPlaylist(
    music: Music
  ) {
    setPlaylist(
      (currentPlaylist) => {
        const alreadyInPlaylist =
          currentPlaylist.some(
            (item) =>
              item.id === music.id
          );

        if (alreadyInPlaylist) {
          return currentPlaylist;
        }

        return [
          ...currentPlaylist,
          music,
        ];
      }
    );
  }

  function removeFromPlaylist(
    id: string
  ) {
    setPlaylist(
      (currentPlaylist) =>
        currentPlaylist.filter(
          (music) =>
            music.id !== id
        )
    );
  }

  return (
    <MusicContext.Provider
      value={{
        playlist,
        favorites,

        currentMusic,

        isPlaying,

        audioPlayer,

        setCurrentMusic,
        setIsPlaying,

        playMusic,
        pauseMusic,

        addFavorite,
        removeFavorite,

        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(
    MusicContext
  );
}