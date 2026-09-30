import { Music } from '../types/Music';

export const musics: Music[] = [
  {
    id: '1',
    title: 'Pra Ela Sou Fofo',
    artist: 'Helio Beatz',
    album: 'Meu Álbum',
    audio: require('../../assets/audios/pra-ela-sou-fofo.mp3'),
    cover: require('../../assets/images/capa.jpg'),
  },

  {
    id: '2',
    title: 'Música 2',
    artist: 'Artista 2',
    album: 'Meu Álbum',
    audio: require('../../assets/audios/musica-2.mp3'),
    cover: require('../../assets/images/capa.jpg'),
  },

  {
    id: '3',
    title: 'Música 3',
    artist: 'Artista 3',
    album: 'Meu Álbum',
    audio: require('../../assets/audios/musica-3.mp3'),
    cover: require('../../assets/images/capa.jpg'),
  },
];