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

import {
  buscarMusicas,
  adicionarMusica,
} from '../api/api';

type MusicContextType = {
  musicas: Music[];
  playlist: Music[];
  favorites: Music[];
  currentMusic: Music | null;
  isPlaying: boolean;
  audioPlayer: any;

  addMusic: (
    music: Omit<Music, 'id'>
  ) => Promise<void>;

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
  const [musicas, setMusicas] = useState<Music[]>([]);

  const [playlist, setPlaylist] = useState<Music[]>([]);

  const [favorites, setFavorites] = useState<Music[]>([]);

  const [currentMusic, setCurrentMusicState] =
    useState<Music | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const audioPlayer = useAudioPlayer(
    currentMusic?.audio ?? null
  );

  const audioStatus =
    useAudioPlayerStatus(audioPlayer);

  useEffect(() => {
    async function carregarMusicas() {
      try {
        const dados = await buscarMusicas();

        console.log(
          'Músicas recebidas da API:',
          dados
        );

        setMusicas(dados);

        if (dados.length > 0) {
          setCurrentMusicState(dados[0]);
        }
      } catch (error) {
        console.log(
          'Erro ao carregar músicas:',
          error
        );
      }
    }

    carregarMusicas();
  }, []);

  useEffect(() => {
    setIsPlaying(
      audioStatus.playing
    );
  }, [audioStatus.playing]);

  function setCurrentMusic(
    music: Music
  ) {
    if (
      currentMusic?.id === music.id
    ) {
      return;
    }

    try {
      audioPlayer.pause();

      if (music.audio) {
        audioPlayer.replace(
          music.audio
        );
      }
    } catch (error) {
      console.log(
        'Erro ao trocar música:',
        error
      );
    }

    setIsPlaying(false);

    setCurrentMusicState(music);
  }

  function playMusic() {
    if (!audioPlayer) {
      return;
    }

    if (!currentMusic?.audio) {
      console.log(
        'Esta música não possui áudio.'
      );

      return;
    }

    try {
      audioPlayer.play();
      setIsPlaying(true);
    } catch (error) {
      console.log(
        'Erro ao reproduzir música:',
        error
      );
    }
  }

  function pauseMusic() {
    if (!audioPlayer) {
      setIsPlaying(false);
      return;
    }

    try {
      audioPlayer.pause();
      setIsPlaying(false);
    } catch (error) {
      console.log(
        'Erro ao pausar música:',
        error
      );
    }
  }

  async function addMusic(
    music: Omit<Music, 'id'>
  ) {
    try {
      const resposta =
        await adicionarMusica(music);

      setMusicas(
        (currentMusicas) => [
          ...currentMusicas,
          resposta.musica,
        ]
      );

      console.log(
        'Música adicionada:',
        resposta.musica
      );
    } catch (error) {
      console.log(
        'Erro ao adicionar música:',
        error
      );
    }
  }

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
        musicas,
        playlist,
        favorites,
        currentMusic,
        isPlaying,
        audioPlayer,

        addMusic,

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