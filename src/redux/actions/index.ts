export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setCurrentSongAction = (song: string) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});
