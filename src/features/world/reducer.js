const intialState = {
  gameover: false
}

const worldReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'GAMEOVER':
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default worldReducer