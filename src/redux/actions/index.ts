import { Track } from '../../types/types';

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setCurrentSongAction = (song: Track) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});
