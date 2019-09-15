import * as Font from 'expo-font'

import createDataContext from './createDataContext'

const loadFont = dispatch => async () => {
  await Font.loadAsync({
    'Cocogoose': require('../../assets/fonts/Cocogoose.ttf'),
    'Comfortaa': require('../../assets/fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-Bold': require('../../assets/fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-light': require('../../assets/fonts/Comfortaa-Regular.ttf')
  })

  dispatch({ type: 'FONT_LOADED' })
}

const fontReducer = (state, action) => {
  switch (action.type) {
    case 'FONT_LOADED':
      return { fontLoaded: true };
    default:
      return state;
  }
}

export const { Context, Provider } = createDataContext(
  fontReducer,
  { loadFont },
  { fontLoaded: false }
);