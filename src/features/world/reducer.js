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
            direction: action.direction,
            key_index: action.key_index
          }
        ]

      })
    case 'UPDATE_TANK':
      return Object.assign({}, state, {
        tanks: 
          state.tanks.map((tank, index) => {
            if (index === action.index) {
              return Object.assign({}, tank, {
                ...tank.key_index,
                position: action.position, 
                direction: action.direction
              })
            }
            return tank
          })
      })    
    case 'REMOVE_TANK':
      let tanks = state.tanks.filter( (tank, index) => index !== action.index)      
      return Object.assign({}, state, {
        tanks: 
          tanks.map((tank, index) => {
            return {
              position: tank.position,
              direction: tank.direction,
              key_index: Date.now() + index
            }       
          })
      })
    default:
      return state
  }
}

export default worldReducer