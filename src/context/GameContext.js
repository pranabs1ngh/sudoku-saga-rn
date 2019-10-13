import createDataContext from './createDataContext'

const loadGame = () => {
  // 1. LOAD GAME FROM STORAGE
  const board = {}

  // 2. DISPATCH GAME
  dispatch({ type: 'LOAD_GAME', payload: board })
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_GAME':
      return {}
    default:
      return state
  }
}

export const { Context, Provider } = createDataContext(
  gameReducer,
  { newGame, loadGame },
  null
)