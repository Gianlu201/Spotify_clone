import { UnknownAction } from '@reduxjs/toolkit';
import { Track, Album, Artist } from '../../types/types';
import { SET_CURRENT_ALBUM_TRACKS, SET_CURRENT_SONG } from '../actions';

const initialAlbum: Album = {
  id: 0,
  title: '',
  cover: '',
  cover_small: '',
  cover_medium: '',
  cover_big: '',
  cover_xl: '',
  md5_image: '',
  tracklist: '',
  type: '',
};

const initialArtist: Artist = {
  id: 0,
  name: '',
  link: '',
  picture: '',
  picture_small: '',
  picture_medium: '',
  picture_big: '',
  picture_xl: '',
  tracklist: '',
  type: '',
};

const initialTrack: Track = {
  id: 0,
  readable: true,
  title: '',
  title_short: '',
  title_version: '',
  link: '',
  duration: 0,
  rank: 0,
  explicit_lyrics: false,
  explicit_content_lyrics: 0,
  explicit_content_cover: 0,
  preview: '',
  md5_image: '',
  artist: initialArtist,
  album: initialAlbum,
  type: '',
};

const initialState = {
  currentSong: initialTrack,
  currentAlbumTracks: [],
};

const mainReducer = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };

    case SET_CURRENT_ALBUM_TRACKS:
      return {
        ...state,
        currentSong: action.payload[0],
        currentAlbumTrack: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
