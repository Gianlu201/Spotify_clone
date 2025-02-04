import { UnknownAction } from '@reduxjs/toolkit';

const initialState = {
  currentSong: '',
};

const mainReducer = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case 'A':
      return {
        ...state,
        currentSong: 'Gianluca',
      };

    default:
      return state;
  }
};

export default mainReducer;
