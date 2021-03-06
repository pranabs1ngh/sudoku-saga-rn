import createDataContext from './createDataContext'

let interval

const setTimer = dispatch => time => {
  dispatch({ type: 'SET_TIMER', payload: time })
}

const updateTimer = dispatch => () => {
  interval = setInterval(() => {
    dispatch({ type: 'UPDATE_TIMER' })
  }, 1000)
}

const pauseTimer = dispatch => () => {
  clearInterval(interval)
  dispatch({ type: 'PAUSE_TIMER' })
}

const stopTimer = dispatch => () => {
  dispatch({ type: 'STOP_TIMER' })
}

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      return action.payload
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
  { setTimer, updateTimer, pauseTimer, stopTimer },
  0
)