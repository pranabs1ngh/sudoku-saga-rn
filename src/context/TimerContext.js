import createDataContext from './createDataContext'

const updateTimer = dispatch => () => {
  setInterval(() => {
    dispatch({ type: 'UPDATE_TIMER' })
  }, 1000)
}

const pauseTimer = dispatch => () => {
  for (let i = 1; i < 999; i++)
    window.clearInterval(i)
  dispatch({ type: 'PAUSE_TIMER' })
}

const setTimer = dispatch => time => {
  dispatch({ type: 'SET_TIMER', payload: time })
}

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      return action.payload
    case 'UPDATE_TIMER':
      return state + 1
    case 'PAUSE_TIMER':
      return state
    default:
      return state
  }
}

export const { Context, Provider } = createDataContext(
  timerReducer,
  { setTimer, updateTimer, pauseTimer },
  0
)