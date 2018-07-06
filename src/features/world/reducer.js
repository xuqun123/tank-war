const intialState = {
  gameover: false,
  tanks: []
}

const worldReducer = (state=intialState, action) => {
  switch(action.type) {
    case 'GAMEOVER':
      return Object.assign({}, state, {
        gameover: action.gameover
      })      
    case 'ADD_TANK':
      return Object.assign({}, state, {
        tanks: [
          ...state.tanks,
          {
            position: action.position, 
            direction: action.direction
          }
        ]

      })
    case 'UPDATE_TANK':
      return Object.assign({}, state, {
        tanks: 
          state.tanks.map((tank, index) => {
            if (index === action.index) {
              return Object.assign({}, tank, {
                position: action.position, 
                direction: action.direction
              })
            }
            return tank
          })
      })    
    case 'REMOVE_TANK':
      return Object.assign({}, state, {
        tanks: state.tanks.filter( (tank, index) => index !== action.index)
      })
    default:
      return state
  }
}

export default worldReducer