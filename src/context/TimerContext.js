import createDataContext from './createDataContext'

const updateTimer = dispatch => () => {
  setInterval(() => {
    dispatch({ type: 'UPDATE_TIMER' })
  }, 1000);
}

const pauseTimer = dispatch => () => {
  for (let i = 1; i < 99999; i++)
    window.clearInterval(i);
  dispatch({ type: 'PAUSE_TIMER' })
}

const stopTimer = dispatch => () => {
  dispatch({ type: 'STOP_TIMER' })
}

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return state + 1
    case 'PAUSE_TIMER':
      return state
    case 'STOP_TIMER':
      return 0
    default:
      return state
  }
}

export const { Context, Provider } = createDataContext(
  timerReducer,
  { updateTimer, pauseTimer, stopTimer },
  0
)