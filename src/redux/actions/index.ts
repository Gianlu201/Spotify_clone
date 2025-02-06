import { Track } from '../../types/types';

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const SET_CURRENT_ALBUM_TRACKS = 'SET_CURRENT_ALBUM_TRACKS';

export const setCurrentSongAction = (song: Track) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const setCurrentAlbumTracksAction = (albumTracks: Track[]) => ({
  type: SET_CURRENT_ALBUM_TRACKS,
  payload: albumTracks,
});
